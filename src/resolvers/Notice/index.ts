import { NoticeModel } from "../../models/Notice/notice.model"
import { GQLEditNotice, GQLPostNotice } from "../../models/Notice/notice.types"
import DBWrapper from "../../wrappers/APIGenerator"

const ModelNotice = new DBWrapper(NoticeModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelNotice.getAPICalls()

const NoticeResolver = {
  Query: {
    async fetchNotices(_: any, prop: any) {
      return await Fetch()
    },
    async fetchNoticeByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postNotice(_: any, prop: GQLPostNotice) {
      return await Create(prop.NoticeInput)
    },
    async editNotice(_: any, prop: GQLEditNotice) {
      return await Edit(prop.NoticeEdit)
    },
    async removeNotice(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default NoticeResolver