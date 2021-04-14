import { Schema } from "mongoose"

const EventSchema = new Schema({
  title: {
    type: String, unique: false
  },
  location: {
    type: String, unique: false
  },
  postedBy: {
    type: String, unique: false
  },
  description: {
    type: String, unique: false
  },
  createdAt: {
    type: String, unique: false, default: String(new Date())
  },
  updatedAt: {
    type: String, unique: false, default: String(new Date())
  }
})

export default EventSchema