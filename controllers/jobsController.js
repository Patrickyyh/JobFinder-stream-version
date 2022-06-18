import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError, UnauthenticatedError} from "../errors/index.js";
import checkPermissions from '../utils/checkPermissions.js'

const createJob = async (req,res) => {
    const {company, position} = req.body;
    if(!company || !position){
        throw new BadRequestError('Please provide all value');
    }

    //The req user userId has been set up in the unauthenticated middle-ware
    req.body.createdBy = req.user.userId; 
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({job});

}


const deleteJob= async (req,res) => {

    const jobId = req.params.id;
    const job = await Job.findOne({_id: jobId});
    
    if(!job){
         throw new NotFoundError(`No job with id: ${jobId}`);
    }
    
    // check for permission 
    checkPermissions(req.user,job.createdBy);
    await job.remove();
    res.status(StatusCodes.OK).json({msg: 'Success! Job removed'});


}
const getAllJobs = async (req,res) => {

    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs,totalJobs: jobs.length, numOfPages: 1});
   

}

// working on the update job
const updateJob= async (req,res) => {
    // make some change over here
    const jobId = req.params.id;
    
    const {company,position,status, jobLocation} = req.body;
    // find the job in the database by the jobid
    if(!company || !position){
        throw new BadRequestError('Please provide all values'); 
    }

    const job = await Job.findOne({_id: jobId});
    if(!job){
         throw new NotFoundError(`No job with id: ${jobId}`);

    }



    // checek for the permission
    checkPermissions(req.user , job.createdBy); 
    

    // update the information inside the job
    job.position = position;
    job.company  = company;
    job.jobLocation = jobLocation;
    job.status = status 
    await job.save();
   


    res.status(StatusCodes.OK).json({job});
      
}

const showStats = async(req,res) => {
    res.send('show stats'); 
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats }



