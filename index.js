import express from 'express';
import mongoose from 'mongoose';
import AuthRoute from './Route/AuthRoute.js';
import UserRoutes from './Route/UserRoutes.js';
import postRoutes from './Route/postRoutes.js';
import MessageRoutes from './Route/MessageRoutes.js';
import ChatRoute from './Route/chatRoutes.js'
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());

const PORT = 5000
app.listen(PORT, () => {
    console.log("this is connected");
})
// MongoDB connection URL
const mongoURI = 'mongodb+srv://ajayshekhawat256:OhW3NuSD0PRydo98@ajayapi.wcvpibj.mongodb.net/AjayApi?retryWrites=true&w=majority&appName=AjayApi';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

app.use('/auth', AuthRoute);
app.use('/user',UserRoutes);
app.use('/post',postRoutes);
app.use('/message',MessageRoutes);
app.use('/chat',ChatRoute);
