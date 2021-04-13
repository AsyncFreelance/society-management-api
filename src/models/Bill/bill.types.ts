import { Document, Model, Query } from "mongoose"

export { Query }

export interface IBill {
  message: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GQLPostBill {
  BillInput: IBillInput
}

export interface GQLEditBill {
  BillEdit: IBillEdit
}

export interface IBillInput {
  message: string
}

export interface IBillEdit {
  _id: string
  message: string
}

export interface IBillDoc {
  _id: string
  message: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IBillDocument extends IBill, Document { }

export interface IBillModel extends IBill, Model<IBillDocument> { }