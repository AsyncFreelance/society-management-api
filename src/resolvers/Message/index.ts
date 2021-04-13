import { MessageModel } from "../../models/Message/message.model"
import { GQLEditMessage, GQLPostMessage, GQLRemoveMessage } from "../../models/Message/message.types"
import DBWrapper from "../../wrappers/APIGenerator"
import ForumResolver from "../Forum"

const ModelMessage = new DBWrapper(MessageModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelMessage.getAPICalls()

const MessageResolver = {
  Query: {
    async fetchMessages(_: any, prop: any) {
      return await Fetch()
    },
    async fetchMessageByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postMessage(_: any, prop: GQLPostMessage) {
      const result = await Create(prop.MessageInput) as any
      await ForumResolver.Mutation.addMessageToForum({}, {
        MessageEdit: result
      })
      return result
    },
    async editMessage(_: any, prop: GQLEditMessage) {
      return await Edit(prop.MessageEdit)
    },
    async removeMessage(_: any, prop: GQLRemoveMessage) {
      const result = await Remove(prop.MessageRemove._id)
      await ForumResolver.Mutation.removeMessageFromForum({}, {
        MessageEdit: prop.MessageRemove as any
      })
      return result
    },
  }
}

export default MessageResolver