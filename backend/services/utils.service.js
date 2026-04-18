import { User } from "../models/user.model.js";
import { Product } from "../models/products.model.js";
import {Role} from '../models/role.model.js'

const Utils = {
  getALLUser: async () => {
    try {
      const user = await User.find().populate('role_id');
      return user;
    } catch (error) {
      throw error;
    }
  },

  getProductCount: async () => {
    try {
      const count = await Product.countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  },

  userCount: async () => {
    try {
      const count = await User.countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  },


  getRole:async()=>{
    try {
      const role=await Role.find()
      return role
      
    } catch (error) {
      throw error
      
    }
  },


  createUser:async (userData) => {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  },


  DeleteUser:async(id)=>{
    try {
      const user = await User.findByIdAndDelete(id)
      return user
    } catch (error) {
      throw error
    }
  }
}

export default Utils;