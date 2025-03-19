import express from "express"
import cors from "cors"
import connectDB from "./config/connect.js"
import userRoutes from "./routes/user.routes.js"
import dotenv from "dotenv"
dotenv.config()

connectDB();
const app=express()



app.use(cors())
app.use(express.json())    
app.use(express.urlencoded({extended:true}))
app.use("/users",userRoutes)

app.get("/", (req,res)=>{
    res.send("Server is running")
})

export default app