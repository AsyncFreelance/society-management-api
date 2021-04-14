import { Schema } from "mongoose"

const BillSchema = new Schema({
  name: {
    type: String, unique: false
  },
  pollDescription: {
    type: String, unique: false
  },
  yes_votes: {
    type: Number, unique: false, default: 0
  },
  no_votes: {
    type: Number, unique: false, default: 0
  },
  abstain_votes: {
    type: Number, unique: false, default: 0
  },
  voteIDs: [{
    type: String, unique: false, default: []
  }],
  createdAt: {
    type: String, unique: false, default: String(new Date())
  },
  updatedAt: {
    type: String, unique: false, default: String(new Date())
  }
})

export default BillSchema