import { generateToken } from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const token = generateToken(user._id);

res.cookie("token", token, cookieOptions);