import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import router from './index.js';
import passport from "passport";
dotenv.config();

const app = express();
app.use(passport.initialize());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // your Frontend's URL
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

await connectDB();
app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Toksido Suit API" });
});
//ROUTES ENTRY POINT FOR ALL API ENDPOINTS
app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
