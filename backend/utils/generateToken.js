import jwt from "jsonwebtoken";

// Helper to generate the long-lived Refresh Tok

export const generateToken = async(userId, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

   const accessToken =  jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } 
  );

  return accessToken;
};

export const refreshToken = async(req, res) => {
  // 1. Get token from cookies (requires cookie-parser middleware)
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh Token not found" });
  }

  try {
    // 2. Verify the Refresh Token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // 3. Generate a new Access Token
    // Note: In a production app, you'd usually fetch the user from the DB 
    // here to ensure the account is still active/get their current role.
    const accessToken = generateToken(decoded.id, decoded.role);

    res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};