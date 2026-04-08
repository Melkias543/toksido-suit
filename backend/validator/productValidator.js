import Joi from "joi";
import mongoose from "mongoose";

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid category_id");
  }
  return value;
};

export const productSchemaValidator = Joi.object({
  name: Joi.object({
    en: Joi.string().allow(""),
    am: Joi.string().allow(""),
    or: Joi.string().allow(""),
  }).custom((value, helpers) => {
    if (!value.en && !value.am && !value.or) {
      return helpers.message("At least one name is required");
    }
    return value;
  }),

  description: Joi.object({
    en: Joi.string().allow(""),
    am: Joi.string().allow(""),
    or: Joi.string().allow(""),
  }),

  price: Joi.number().required(),

  category_id: Joi.string().custom(objectIdValidator).required(),

  image: Joi.any(), // file (multer)
});