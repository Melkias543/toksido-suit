import mongo from 'mongoose'

const wishlistSchema = new mongo.Schema({
  user_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'User'
  },
  product_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'Product'
  }
}, { timestamps: true })

export const Wishlist = mongo.model('Wishlist', wishlistSchema)