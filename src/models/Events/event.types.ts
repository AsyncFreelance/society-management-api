import { Document, Model, Query } from "mongoose"

export { Query }

export interface IEvent {
  title: string
  location: string
  postedBy: string
  description: string
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
  title: string
  location: string
  postedBy: string
  description: string
}

export interface IEventEdit {
  _id: string
  title: string
  location: string
  postedBy: string
  description: string
}

export interface IEventDoc {
  _id: string
  title: string
  location: string
  postedBy: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IEventDocument extends IEvent, Document { }

export interface IEventModel extends IEvent, Model<IEventDocument> { }