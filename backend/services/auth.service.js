import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const AuthService = {

  register: async (data) => {
    try {
      const { password } = data;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        ...data,
        password: hashedPassword,
      });

      return user;

    } catch (error) {
      throw error;
    }
  },
  checkIfUserExist:async(email)=>{
try {
const user = await User.findOne({ email })

if(!user){
        return false
    }

    return user
} catch (error) {
    console.log("fail to find user by getbyemail", error.message);
   throw error 
}
  },

  login: async ({ email }) => {
    try {
      const user = await User.findOne({ email }).populate('role_id');;
      return user;
    } catch (error) {
        console.log("fail to login user by email", error.message);
      throw error;
    }
  },
};

export default AuthService;