import mongoose from 'mongoose';

// 1. Define the reusable multi-language structure
// _id: false prevents Mongoose from adding a unique ID to every name/description object
const localizedStringSchema = new mongoose.Schema({
  en: { type: String, trim: true },
  am: { type: String, trim: true },
  or: { type: String, trim: true }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  name: {
    type: localizedStringSchema,
    // Define the validator directly on the 'name' path
    validate: {
      validator: function (value) {
        // 'value' is the object { en, am, or }
        return !!(value && (value.en || value.am || value.or));
      },
      message: 'A service name must be provided in at least one language (en, am, or or).'
    }
  },
  description: {
    type: localizedStringSchema
    // Optional: add a validator here too if description is required
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

/**
 * INDEXING
 * Sparse is correct here since individual languages might be missing.
 */
serviceSchema.index({ 'name.en': 1 }, { sparse: true });
serviceSchema.index({ 'name.am': 1 }, { sparse: true });
serviceSchema.index({ 'name.or': 1 }, { sparse: true });

export const Service = mongoose.model('Service', serviceSchema);