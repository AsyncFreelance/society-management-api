import { Schema } from "mongoose"

const UserSchema = new Schema({
  firstName: {
    type: String, unique: false
  },
  lastName: {
    type: String, unique: false
  },
  email: {
    type: String, unique: false
  },
  password: {
    type: String, unique: false
  },
  createdAt: {
    type: String, unique: false, default: String(new Date())
  },
  updatedAt: {
    type: String, unique: false, default: String(new Date())
  }
})

export default UserSchema