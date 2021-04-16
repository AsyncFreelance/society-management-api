import { Document, Model, Query } from "mongoose"

export { Query }

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface GQLLoginInput {
  LoginInput: ILogin
}

export interface ILogin {
  email: string
  password: string
  isAdmin: boolean
}

export interface GQLPostUser {
  UserInput: IUserInput
}

export interface GQLEditUser {
  UserEdit: IUserEdit
}

export interface IUserInput {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
}

export interface IUserEdit {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
}

export interface IUserDoc {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserDocument extends IUser, Document { }

export interface IUserModel extends IUser, Model<IUserDocument> { }