import mongo from 'mongoose'

const recommendationSchema = new mongo.Schema({
  user_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'User',  // links to the User model
    required: true
  },
  product_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'Product',  // links to the Product model
    required: true
  }
}, { timestamps: true })

export const Recommendation = mongo.model('Recommendation', recommendationSchema)