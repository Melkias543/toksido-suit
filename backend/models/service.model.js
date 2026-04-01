import mongo from 'mongoose'

const serviceSchema = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: Number
}, { timestamps: true })

export const Service = mongo.model('Service', serviceSchema)