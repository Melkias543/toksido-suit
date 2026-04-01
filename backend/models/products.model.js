import mongo from 'mongoose'

const productSchema = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'Category'
  },
  stock: {
    type: Number,
    default: 0
  },
  image: String
}, { timestamps: true })

export const Product = mongo.model('Product', productSchema)