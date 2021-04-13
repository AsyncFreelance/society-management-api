import { Document, Model, Query } from "mongoose"

export { Query }

export interface IEvent {
  message: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GQLPostEvent {
  EventInput: IEventInput
}

export interface GQLEditEvent {
  EventEdit: IEventEdit
}

export interface IEventInput {
  message: string
}

export interface IEventEdit {
  _id: string
  message: string
}

export interface IEventDoc {
  _id: string
  message: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IEventDocument extends IEvent, Document { }

export interface IEventModel extends IEvent, Model<IEventDocument> { }