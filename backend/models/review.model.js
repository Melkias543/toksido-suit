import mongo from 'mongoose'

const reviewSchema = new mongo.Schema({
  user_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'User'
  },
  suit_id: {
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
reviewSchema.index({ user_id: 1, suit_id: 1 }, { unique: true });
export const Review = mongo.model('Review', reviewSchema)

