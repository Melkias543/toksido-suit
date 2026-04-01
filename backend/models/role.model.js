import mongo from 'mongoose'

const roleSchema = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
}, { timestamps: true })

export const Role = mongo.model('Role', roleSchema)