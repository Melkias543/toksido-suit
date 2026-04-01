import mongo from 'mongoose'

const categorySchema = new mongo.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String
}, { timestamps: true })

export const Category = mongo.model('Category', categorySchema)