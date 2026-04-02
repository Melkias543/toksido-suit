import express from 'express'

const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.config.js';
dotenv.config()

app.use(cors())
app.use(express.json());

await  connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})