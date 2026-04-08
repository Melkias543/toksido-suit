import mongoose from 'mongoose';

// 1. Define the language structure separately
const languageSchema = new mongoose.Schema({
  en: { type: String, trim: true },
  am: { type: String, trim: true },
  or: { type: String, trim: true }
}, { _id: false }); // Stops Mongoose from creating sub-IDs for names

const categorySchema = new mongoose.Schema({
  name: {
    // FIX: Explicitly tell Mongoose that 'name' uses the languageSchema type
    type: languageSchema,
    required: true, 
    validate: {
      // FIX: Ensure 'validator' is lowercase
      validator: function (value) {
        return !!(value.en || value.am || value.or);
      },
      message: 'A category name must be provided in at least one language.'
    }
  }
}, { timestamps: true });

// Sparse index for English names
categorySchema.index({ 'name.en': 1 }, { unique: true, sparse: true });

export const Category = mongoose.model('Category', categorySchema);