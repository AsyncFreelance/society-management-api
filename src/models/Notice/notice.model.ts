import { model } from "mongoose"
import { INoticeDocument } from "./notice.types"
import NoticeSchema from "./notice.schema"

export const NoticeModel = model("notices", NoticeSchema)