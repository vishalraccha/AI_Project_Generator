import express from "express"
import cors from "cors"
import connectDB from "./config/connect.js"
import userRoutes from "./routes/user.routes.js"
import projectRoutes from "./routes/project.routes.js"
import dotenv, { parse } from "dotenv"
import morgan from "morgan"
import cookieParser from 'cookie-parser';
dotenv.config()

connectDB();
const app=express()


app.use(cookieParser());

// const corsOptions = {
//     origin: "http://localhost:5173",  // Allow requests only from localhost:5000
//     methods: ["GET", "POST", "PUT", "DELETE"],  // Optional: specify allowed HTTP methods
//     credentials: true,  // Optional: allow credentials like cookies
//   };

app.use(cors())
app.use(express.json())    
app.use(express.urlencoded({extended:true}))
app.use("/user",userRoutes)
app.use("/project",projectRoutes)
app.use(morgan("dev"));


app.get("/", (req,res)=>{
    res.send("Server is running")
})

export default app