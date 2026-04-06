import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import express from 'express'
import helmet from 'helmet'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.config.js';
dotenv.config()

app.use(cors())
app.use(express.json());
app.use(helmet())
app.use(cookieParser());

await  connectDB();

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})