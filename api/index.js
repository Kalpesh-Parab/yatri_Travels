import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import packagesRoute from "./routes/packages.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import enquiryRoute from "./routes/enquiry.js"

const app = express();
dotenv.config();


const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB Connected, Woohoo! Keep Going...");

    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB Disconnected!");
});

//********************MIDDLEWARES********************
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/packages", packagesRoute);
app.use("/api/enquiry", enquiryRoute);


app.use((err, req, res, next)=>{
    const errorStatus = err.Status || 500;
    const errormessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success :  false,
        status : errorStatus,
        message : errormessage,
        stack : err.stack,
    });
});

app.listen(8888, ()=>{
    connect()
    console.log("Backend Connected, You can do it!")
})