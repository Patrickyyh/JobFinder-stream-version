import { StatusCodes } from "http-status-codes";
let localStream  ;
let remoteStream ;
let peerConnection; 
let APP_ID = 'cc69dcd186d6426da879cdc7dd451cb6';
let token = null;





// responsible for fetching the stream
const stream  = async(req,res)=>{
    
    


    res.status(StatusCodes.OK).json({
        text:'hellow word'
    })


}


export {stream}