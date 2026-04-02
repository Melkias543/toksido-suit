import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: {
    // Individual 'required: true' removed to allow flexibility
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
    required: true
  }
}, { timestamps: true })

/**
 * THE FIX: Custom Path Validator
 * This ensures the 'name' object isn't empty. 
 * It will pass if 'en', 'am', OR 'or' has a value.
 */
serviceSchema.path('name').validate(function (value) {
  return !!(value.en || value.am || value.or);
}, 'A service name must be provided in at least one language (English, Amharic, or Afan Oromo).');

/**
 * INDEXING
 * Using 'sparse: true' for the indexes is safer now that 
 * individual language fields are no longer strictly required.
 */
serviceSchema.index({ 'name.en': 1 }, { sparse: true });
serviceSchema.index({ 'name.am': 1 }, { sparse: true });
serviceSchema.index({ 'name.or': 1 }, { sparse: true });

export const Service = mongoose.model('Service', serviceSchema)