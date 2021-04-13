import { model } from "mongoose"
import { IForumDocument } from "./forum.types"
import ForumSchema from "./forum.schema"

export const ForumModel = model<IForumDocument>("forums", ForumSchema)