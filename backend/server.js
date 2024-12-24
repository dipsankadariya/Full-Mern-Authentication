import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
dotenv.config();
const app = express()
app.use(express.json());


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