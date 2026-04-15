import mongo from 'mongoose'

const roleSchema = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
}, { timestamps: true })

export const Role = mongo.model('Role', roleSchema)