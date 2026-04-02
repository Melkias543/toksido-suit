import mongo from 'mongoose'

const userSchema = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role_id: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'Role'
  },
  phone: String
}, { timestamps: true })

userSchema.index({ email: 1 }, { unique: true })
export const User = mongo.model('User', userSchema)