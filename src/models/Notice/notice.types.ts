import { Document, Model, Query } from "mongoose"

export { Query }

export interface INotice {
  message: string
}

export interface GQLPostNotice {
  NoticeInput: INoticeInput
}

export interface GQLEditNotice {
  NoticeEdit: INoticeEdit
}

export interface INoticeInput {
  message: string
}

export interface INoticeEdit {
  _id: string
  message: string
}

export interface INoticeDoc {
  _id: string
  message: string
  createdAt?: Date
  updatedAt?: Date
}

export interface INoticeDocument extends INotice, Document {}

export interface INoticeModel extends INotice, Model<INoticeDocument> { }