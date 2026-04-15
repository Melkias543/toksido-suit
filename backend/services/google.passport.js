import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import dotnv from 'dotenv'
dotnv.config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value }).populate("role_id");

      if (!user) {
        // 2. If not, create them (Like your Register logic)
        const userRole = await Role.findOne({ name: "user" });
        
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          password: "google-auth-no-password", // Google users don't need a local password
          role_id: userRole._id,
          // You can add a googleId field to your model if you want
        });
        
        // Populate role for the token generator
        user = await user.populate("role_id");
      }

      return done(null, user);
    } catch (error) {
        console.error("Google OAuth Error:", error);
      return done(error, null);
    }
  }
));