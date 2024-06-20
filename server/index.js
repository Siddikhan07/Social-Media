import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';



// Routes
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js'


const app = express();

app.use(express.static('public'));
app.use('/images',express.static("images"))

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://siddikhan6040:8gcGOQmD5GZQq029@cluster0.9gf10xc.mongodb.net/SocialMedia?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => app.listen(8001, () => console.log("Mongodb Connected")))
  .catch((error)=>console.log(error));
  

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload',UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);