import express from "express";
import bodyParser from "body-parser"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;


mongoose
        .connect(MONGO_URL)
        .then(()=>{
            console.log("Db Connected succefully");
            app.listen(PORT,()=>{
                console.log(`Server is running on port ${PORT}`)
            })
        })
        .catch((error)=> console.log(error));
app.use(cors())
app.use("/api",route);