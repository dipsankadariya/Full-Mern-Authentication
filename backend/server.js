import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express()

app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log(`Connected to the database`);
})
.catch((error)=>
{
    console.log(error); 
});

app.listen(3000,()=>{
    console.log(`Server listening on port 3000!`);
})


//routes
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


//adding middleware to handle errors
app.use((err,req,res, next)=>{
    const statusCode  = err.statusCode  ||500;
    const message = err.message || 'Internal Server error';
    return  res.status(statusCode).json({
        sucess:false,
        error:message,
        statusCode:statusCode,
    })
})