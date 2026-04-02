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
wishlistSchema.index({ user_id: 1, product_id: 1 }, { unique: true })

export const Wishlist = mongo.model('Wishlist', wishlistSchema)