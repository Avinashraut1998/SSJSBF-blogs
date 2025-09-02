import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import path from 'path';
import { connectDB } from './config/db.js';
import  cookieParser  from 'cookie-parser'
import cors from 'cors'

const app = express();

const PORT = process.env.PORT ;

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) =>  res.json({ message: "Server is Working" }))

// Import user routes
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import blogRouter from "./routes/blog.routes.js";

// console.log("user router", userRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/blogs", blogRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(import.meta.dirname, "views", "404.html"));
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});