import { model } from "mongoose"
import { IMessageDocument } from "./message.types"
import MessageSchema from "./message.schema"

export const MessageModel = model<IMessageDocument>("messages", MessageSchema)