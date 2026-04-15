import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";
import { User } from "../models/user.model.js";
import AuthService from "../services/auth.service.js";
import { Role } from "../models/role.model.js";
import dotnv from 'dotenv'
dotnv.config()
const AuthController = {
   googleCallback:async (req, res) => {
    try {
      // Passport.js attaches the user profile returned from our Strategy to req.user
      const user = req.user; 

      if (!user) {
        return res.status(400).json({ message: "Google Authentication failed" });
      }

      // ✅ 1. Generate token using your existing util
      // We assume user.role_id is populated in the Passport Strategy (see step 3)
      const token = await generateToken(user._id, user.role_id.name);

      // ✅ 2. Set cookie using your existing options
      res.cookie("token", token, cookieOptions);

      // ✅ 3. Redirect back to Frontend (Since this is a GET request from a browser redirect)
      // You cannot send a JSON response here because the browser is in a redirect flow.
      res.redirect(process.env.FRONTEND_URL);

    } catch (error) {
      console.log("❌ Google Auth Controller Error:", error.message);
      res.redirect("http://localhost:3000/login?error=auth_failed");
      
    }
  },



  register: async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;
     const userRole = await Role.findOne({ name: "user" });
    
    if (!userRole) {
      throw new Error("❌ Admin role not found. Please run the Role Seeder first.");
    }

    // console.log("🔍 user Role Found:", userRole._id);
 if (!username || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
      }
const userData = {
        username,
        email,
        password,
        phone,
        role_id: userRole._id, // Mapping the ID found in DB
      };
     

      const userExist = await AuthService.checkIfUserExist(email)
      if (userExist) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await AuthService.register(userData);
      if(!user){
        return res.status(400).json({
          message:"Fail to register User"
        })
      }

      return res.status(201).json({
        message: "User created successfully",
      });

    } catch (error) {
      console.log("fail to register user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }



      
      
      // ✅ Generate token HERE
      const token = await generateToken(user._id,user.role_id.name);


      console.log("user and pass matched:",user,'token:' ,token)
      // ✅ Set cookie
      res.cookie("token", token, cookieOptions);

      return res.status(200).json({
        message: "Login success",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role_id.name,
        },
      });

    } catch (error) {
      console.log("fail to login user", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default AuthController;