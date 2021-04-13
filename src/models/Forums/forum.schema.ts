import { Schema } from "mongoose"

const ForumSchema = new Schema({
  title: {
    type: String, unique: false
  },
  messages: [{
    type: Object, unique: false, default: []
  }],
  createdAt: {
    type: String, unique: false, default: String(new Date())
  },
  updatedAt: {
    type: String, unique: false, default: String(new Date())
  }
})

export default ForumSchema