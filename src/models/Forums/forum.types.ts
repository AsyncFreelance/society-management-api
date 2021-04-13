import { Document, Model, Query } from "mongoose"

export { Query }

export interface IForum {
  title: string
  messages: object[]
  createdAt?: Date
  updatedAt?: Date
}

export interface GQLPostForum {
  ForumInput: IForumInput
}

export interface GQLEditForum {
  ForumEdit: IForumEdit
}

export interface IForumInput {
  title: string
}

export interface IForumEdit {
  _id: string
  title: string
  messages: object[]
}

export interface IForumDoc {
  _id: string
  title: string
  messages: object[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IForumDocument extends IForum, Document { }

export interface IForumModel extends IForum, Model<IForumDocument> { }