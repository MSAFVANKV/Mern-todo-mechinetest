import express  from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//Routes
import userRoute from './routes/userRoute.js'
const app = express();
dotenv.config()
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8001;

//Connect to MongoDB Database

mongoose.connect(process.env.MONGO_LOCAL,{
}).then(()=>{
    console.log("MongoDB connected");
}).catch((err) =>{
    console.error(`Connection failed!! ${err}`);
})

app.use('/user',userRoute)

app.listen(PORT,()=>{
    console.log(`server connected on http://localhost:${PORT}`);
})