
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes";
import {BadRequestError,NotFoundError, UnauthenticatedError} from "../errors/index.js";


//Register controller 
const register =  async (req,res) => {

    /**
     * Using the new method, we could get rid of the 
     * try and catch block by using the 'express-async-errors' in the controller
     */

    const {email,password, name} = req.body; 
    if(!email || !password || !name){
        throw new BadRequestError('please provide all values'); 
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        throw new BadRequestError('Email already in Use');
    }
    
    const user = await User.create({email,password, name});
    
    // invoke the build in function. 
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user:{
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
        }
        ,token});



}


// Login controller 
const login = async (req,res) => {

    // extract the password and email 
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide all values'); 
    }

    // want to find the user by email and password 
    // extract the password. 
    const user = await User.findOne({email}).select('+password');
   
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // compare the password 
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // every time we login we need to create a new JWT
    const token = user.createJWT();
    
    // make the password undefined for the safety 
    user.password = undefined;
    res.status(StatusCodes.OK).json({user, token , location: user.location})

}


// update user Controller  
const updateUser =  async (req,res) => {
    const {email,name, location, lastName } = req.body;
    if(!email  || !name || !location || !lastName){
        throw new BadRequestError('Please provide all values'); 
    }

    // User the userID inside the reqbody to query the user 
    const user = await User.findOne({_id: req.user.userId});

    // update the corresponding value 
    user.email    = email;
    user.name     = name;
    user.location = location;
    user.lastName = lastName;
    
    // Saved the updated value
    await user.save();
    
    //create a new token 
    const token = user.createJWT();

    // define the response
    res.status(StatusCodes.OK).json({
        user,
        token,
        location: User.location,
    })

}

export {register,login,updateUser}