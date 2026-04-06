import Joi from "joi";
export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required("Username is required"),
  email: Joi.string().email("Please enter a valid email").required("Email is required"),
  password: Joi.string().min(6).required("Password is required"),
});