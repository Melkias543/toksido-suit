import mongo from 'mongoose'

const reviewSchema = new mongo.Schema({
  user_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'User'
  },
  product_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'Product'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String
}, { timestamps: true })

export const Review = mongo.model('Review', reviewSchema)

