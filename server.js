import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import morgan from 'morgan';


// DB and authenticateUser
import connectDB from './db/connect.js'

// routes 
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRoutes.js'

// for the peer to peer streaming 
import streamRouter from './routes/streamRoutes.js';



dotenv.config();
const app = express();
app.use(cors())

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import { errorHandlerMiddle } from './middleware/error-handler.js';
import authenticateUser from "./middleware/auth.js";


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

app.use(express.json()); 

const port = process.env.PORT || 5001


app.use('/api/v1/auth',authRouter); 
app.use('/api/v1/jobs',authenticateUser,jobRouter); 
app.use('/api/v1/stream',streamRouter); 


app.use(notFoundMiddleWare)
app.use(errorHandlerMiddle)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port , () => {   
            console.log(`Serving is listening on port ${port}....`);
        })
    } catch (error) {
        console.log(error);  
    }
}

start(); 
