
import { StatusCodes } from "http-status-codes";
export const errorHandlerMiddle = (err,req,res,next) => {

    const defaultError = {
        StatusCodes: err.StatusCodes|| StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message ||'Something went wrong , try again later.',
    }

     // missing field error 
    if(err.name === 'ValidationError'){
        defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
        //defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')
        
    }

     // unique filed error
     // To check the unique email address over here  
    // if(err.code && err.code === 11000){
    //     defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    //     defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    // }
    res.status(defaultError.StatusCodes).json({msg: defaultError.msg});
}


