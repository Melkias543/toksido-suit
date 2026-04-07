import Joi from "joi";
import mongoose from "mongoose";

// Custom validator for MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid category_id");
  }
  return value;
};

// Product validation schema
