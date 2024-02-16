const dotenv = require("dotenv").config();
const express = require("express")
const app = express()
const port = 5000;
const mongoose = require("mongoose")
const router = require("./routes/user-routes")
// const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser")

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use("/api",router);
app.get("/",(req,res)=>{
    res.status(200).send("/ is running")
})

mongoose.connect("mongodb://127.0.0.1:27017/mern-auth").then(()=>{
    console.log("connected to Db");
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})