import jwt from "jsonwebtoken";

export const refreshToken=()=>{

}

export const generateToken = (userId, role) => {
  // Check if secret exists to prevent runtime crashes
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return jwt.sign(
    { 
      id: userId, 
      role: role 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: "15m" // Lowercase 'm' for 15 minutes
    }
  );
};