import AuthController from "../controllers/auth.controller.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { LoginSchema, registerSchema } from "../validator/authValidator.js";
import passport from "passport";
const authRoutes = express.Router();
import '../services/google.passport.js'

authRoutes.post("/register",  validate(registerSchema) ,AuthController.register);
authRoutes.post("/login",validate(LoginSchema),AuthController.login);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.googleCallback
);


export default authRoutes
