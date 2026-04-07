import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    // Individual 'required: true' removed to allow any single language to work
    en: { type: String, trim: true },
    am: { type: String, trim: true },
    or: { type: String, trim: true }
  },
  description: {
    en: { type: String, trim: true },
    am: { type: String, trim: true },
    or: { type: String, trim: true }
  },
  price: {
    type: Number,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true 
  },
  image: {
    type: String,
    required: true 
  }
}, { timestamps: true })

/**
 * THE FIX: Custom Path Validator
 * This ensures the 'name' object isn't empty. 
 * It will pass if 'en', 'am', OR 'or' has a value.
 */
productSchema.path('name').validate(function (value) {
  return !!(value.en || value.am || value.or);
}, 'A product name must be provided in at least one language (English, Amharic, or Afan Oromo).');

/**
 * INDEXING
 * Use 'sparse: true' so that if 'name.en' is missing, 
 * MongoDB doesn't throw errors for multiple empty values.
 */
productSchema.index({ 'name.en': 1 }, { sparse: true })

export const Product = mongoose.model('Product', productSchema)