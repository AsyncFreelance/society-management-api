import { model } from "mongoose"
import { IBillDocument } from "./bill.types"
import ForumSchema from "./bill.schema"

export const BillModel = model<IBillDocument>("bills", ForumSchema)