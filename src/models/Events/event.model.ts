import { model } from "mongoose"
import { IEventDocument } from "./event.types"
import EventSchema from "./event.schema"

export const EventModel = model("events", EventSchema)