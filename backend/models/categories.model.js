import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    // We remove 'required: true' from individual fields to allow flexibility
    en: { type: String, trim: true },
    am: { type: String, trim: true },
    or: { type: String, trim: true }
  },
  description: {
    en: { type: String, trim: true },
    am: { type: String, trim: true },
    or: { type: String, trim: true }
  }
}, { timestamps: true })

/**
 * THE FIX: Custom Validator
 * This checks the 'name' object before saving. 
 * If all three are empty, it fails. If at least one has text, it passes.
 */
categorySchema.path('name').validate(function (value) {
  return !!(value.en || value.am || value.or);
}, 'You must provide a name in at least one language (English, Amharic, or Afan Oromo).');

/**
 * INDEXING
 * We use 'sparse: true' because if 'en' is occasionally left blank, 
 * a standard unique index would cause errors with multiple empty values.
 */
categorySchema.index({ 'name.en': 1 }, { 
  unique: true, 
  sparse: true 
})

export const Category = mongoose.model('Category', categorySchema)