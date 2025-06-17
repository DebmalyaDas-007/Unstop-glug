import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './routes/Auth.route.js';
import EventRoute from './routes/Event.route.js';
import TeamRoute from './routes/Team.route.js';
import collabRoute from './routes/collaborations.route.js'
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
dotenv.config();
app.use(cookieParser());
const PORT= process.env.PORT || 3000;

app.use('/api/auth',AuthRoute);
app.use('/api/event',EventRoute);
app.use('/api/team',TeamRoute);
app.use('/api/collaborations',collabRoute);

mongoose.connect(process.env.MONGODB_CONN).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("MongoDB connection error: ", err);
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}
);