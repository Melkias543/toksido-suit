import mongoose from "mongoose";
import { Role } from "../models/role.model.js";
import AuthService from "../services/auth.service.js";
import Utils from "../services/utils.service.js";
import bcrypt from "bcrypt";
const utilsController = {
  getCountOfALLProduct: async (req, res) => {
    try {
      const count = await Utils.getProductCount();

      return res.status(200).json({
        message: "Success Count",
        count: count,
      });
    } catch (error) {

      console.log("error of get count of all product", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  getALLUser: async (req, res) => {
    try {
      const users = await Utils.getALLUser();

      if (users.length === 0) {
        return res.status(404).json({
          message: "No users found",
        });
      }

      return res.status(200).json({
        message: "Successfully fetched.",
        users: users,
      });
    } catch (error) {
      console.log("error of fetching all user", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  getCountOfALLUser: async (req, res) => {
    try {
      const count = await Utils.getALLUser()

      return res.status(200).json({
        message: "User count fetched successfully",
        count: count,
      });
    } catch (error) {
      console.log("error of counting users", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

getrole:async(req,res)=>{
  try {
    const role= await Utils.getRole()
if(!role){
return res.status(404).json({
      message:"role not found"
    })

}
    
    return res.status(200).json({
      message:"role fetched successfully",
      data:role
    })

  } catch (error) {

    console.log("error of getting role", error)
    return res.status(500).json({
      message:"internal server error"
    })
  }
},

createUser:async(req,res)=>{
try {
  const { username, email, password, phone, role_id } = req.body;

    // 1. Validation: Check if all required fields exist
    if (!username || !email || !password || !role_id) {
      return res.status(400).json({ 
        message: "Please provide all required credentials." 
      });
    }

    // 2. Check for Duplicate User: Email must be unique
    const existingUser = await AuthService.checkIfUserExist(email);
    if (existingUser) {
      return res.status(409).json({ 
        message: "A user with this email already exists." 
      });
    }

// console.log("this is role id ",role_id)
    // 3. Verify Role: Ensure the provided role_id actually exists in the DB
const roleExists = await Role.findById(role_id);
    if (!roleExists) {
      return res.status(400).json({ 
        message: "The assigned security role is invalid." 
      });
    }
     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Creation: Save to Database
    const newUser = await Utils.createUser({
      username,
      email,
      phone,
      password: hashedPassword,
      role_id,
    });   


    if(!newUser){
      return  res.status(400).json({
        message: "Failed to create user"
      })
    }
return res.status(201).json({
      message: "User provisioned successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: roleExists.name
      }
    });
} catch (error) {
  console.log("error on creating user", error)
  return res.status(500).json({
    message:"internal server error"
  })
}
},
deleteUser:async(req, res)=>{

  try {
    const {id} = req.params
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    message: "Invalid user ID",
  });
}

    const deleteUser = await Utils.DeleteUser(id)
    if(!deleteUser){
      return res.status(400).json({
        message:"failed to delete user"
      })
    }
    return res.status(200).json({
      message:"user deleted successfully"
    })
  } catch (error) {
    console.log("error on deleting user", error)
    return res.status(500).json({
      message:"internal server error"
    })
  }
}


};

export default utilsController;