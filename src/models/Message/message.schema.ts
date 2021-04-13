import { Schema } from "mongoose"

const MessageSchema = new Schema({
  forumID: {
    type: String, unique: false,
  },
  from: {
    type: String, unique: false,
  },
  message: {
    type: String, unique: false,
  },
  createdAt: {
    type: String, unique: false, default: String(new Date())
  },
  updatedAt: {
    type: String, unique: false, default: String(new Date())
  }
})

export default MessageSchema