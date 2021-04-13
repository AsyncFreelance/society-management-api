import { Document, Model, Query } from "mongoose"

export { Query }

export interface IMessage {
  message: string
  forumID: string
  from: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GQLPostMessage {
  MessageInput: IMessageInput
}

export interface GQLEditMessage {
  MessageEdit: IMessageEdit
}

export interface GQLRemoveMessage {
  MessageRemove: IMessageRemove
}

export interface IMessageInput {
  message: string
  forumID: string
  from: string
}

export interface IMessageEdit {
  _id: string
  message: string
  forumID: string
  from: string
}

export interface IMessageRemove {
  _id: string
  forumID: string
}

export interface IMessageDoc {
  _id: string
  message: string
  forumID: string
  from: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IMessageDocument extends IMessage, Document { }

export interface IMessageModel extends IMessage, Model<IMessageDocument> { }