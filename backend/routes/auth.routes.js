import AuthController from "../controllers/auth.controller.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { LoginSchema, registerSchema } from "../validator/authValidator.js";
const authRoutes = express.Router();


authRoutes.post("/register",  validate(registerSchema) ,AuthController.register);
authRoutes.post("/login",validate(LoginSchema),AuthController.login);


export default authRoutes
