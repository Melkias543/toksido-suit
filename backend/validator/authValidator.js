import Joi from "joi";
export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required("Username is required"),
  email: Joi.string().email().required("Email is required"),
  phone:Joi.string()
      .required("Phone number is required"),
  password: Joi.string().min(6).required("Password is required"),
  role_id:Joi.string().optional()

});

export const LoginSchema =Joi.object({
   email: Joi.string().email().required("Email is required"),
  password: Joi.string().min(6).required("Password is required"),
})