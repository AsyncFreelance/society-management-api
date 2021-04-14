import { Document, Model, Query } from "mongoose"

export { Query }

export interface IBill {
  name: string
  pollDescription: string
  yes_votes: number
  no_votes: number
  abstain_votes: number
  voteLimit: number
  voteIDs: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface GQLVoteInput {
  _id: string
  userID: string
}

export interface GQLPostBill {
  BillInput: IBillInput
}

export interface GQLEditBill {
  BillEdit: IBillEdit
}

export interface IBillInput {
  name: string
  pollDescription: string
  voteLimit: number
}

export interface IBillEdit {
  _id: string
  name: string
  pollDescription: string
  yes_votes: number
  no_votes: number
  voteLimit: number
  abstain_votes: number
}

export interface IBillDoc {
  _id: string
  name: string
  pollDescription: string
  yes_votes: number
  no_votes: number
  abstain_votes: number
  voteLimit: number
  voteIDs: string[]
  error: object
  createdAt?: Date
  updatedAt?: Date
}

export interface IBillDocument extends IBill, Document { }

export interface IBillModel extends IBill, Model<IBillDocument> { }