import mongoose from 'mongoose';

// 1. Define the multi-lang structure as a reusable Schema
const localizedStringSchema = new mongoose.Schema({
  en: { type: String, trim: true },
  am: { type: String, trim: true },
  or: { type: String, trim: true }
}, { _id: false }); // _id: false prevents Mongoose from adding IDs to every name object

const productSchema = new mongoose.Schema({
  name: {
    type: localizedStringSchema,
    // Move the validator INLINE here
    validate: {
      validator: function (value) {
        // 'value' is the localizedString object
        return !!(value.en || value.am || value.or);
      },
      message: 'A product name must be provided in at least one language.'
    }
  },
  description: {
    type: localizedStringSchema
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
}, { timestamps: true });

// Indexing remains the same
productSchema.index({ 'name.en': 1 }, { sparse: true });

export const Product = mongoose.model('Product', productSchema);