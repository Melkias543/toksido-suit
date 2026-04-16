import AuthController from "../controllers/auth.controller.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { LoginSchema, registerSchema } from "../validator/authValidator.js";
import passport from "passport";
const authRoutes = express.Router();
import '../services/google.passport.js'
import { authMiddleware, authorize } from "../middlewares/auth.midlware.js";

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


// This is the endpoint your Next.js frontend calls
authRoutes.get("/verify-admin", authMiddleware, authorize("admin"), (req, res) => {
  // If the code reaches here, it means:
  // 1. The token was valid (authMiddleware passed)
  // 2. The user role is "admin" (authorize passed)
  
  res.status(200).json({ 
    success: true, 
    user: {
      id: req.user.id,
      role: req.user.role
    }
  });
});


authRoutes.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // true in production
    sameSite: "strict"
  });
  res.status(200).json({ message: "Logged out" });
});

export default authRoutes
