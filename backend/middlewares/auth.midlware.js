import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Ensure cookie-parser is installed in Express

  if (!token) {
    return res.status(401).json({ 
      message: "Authentication required", 
      code: "AUTH_REQUIRED" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Standard practice: check if token is expired or blacklisted here
    req.user = decoded; 
    next();
  } catch (error) {

    console.log("Token verification error:", error.message)
    return res.status(401).json({ 
      message: "Session expired or invalid", 
      code: "TOKEN_INVALID" 
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    // Safety check: ensure authMiddleware was called first
    if (!req.user) {
      return res.status(401).json({ message: "User not identified" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "You do not have permission to perform this action",
        code: "FORBIDDEN" 
      });
    }
    next();
  };
};