import { MessageModel } from "../../models/Message/message.model"
import { GQLEditMessage, GQLPostMessage, GQLRemoveMessage } from "../../models/Message/message.types"
import DBWrapper from "../../wrappers/APIGenerator"
import ForumResolver from "../Forum"

const ModelMessage = new DBWrapper(MessageModel)
const { Create, Edit, Fetch, FetchOne, Remove, Find } = ModelMessage.getAPICalls()

const MessageResolver = {
  Query: {
    async fetchMessages(_: any, prop: any) {
      return await Fetch()
    },
    async fetchMessageByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    },
    async fetchMessagesByForumID(_: any, prop: any) {
      return await Find({ forumID: prop.forumID })
    }
  },

  Mutation: {
    async postMessage(_: any, prop: GQLPostMessage) {
      const messageResult = await Create(prop.MessageInput) as any
      const result = await ForumResolver.Mutation.addMessageToForum({}, {
        MessageEdit: messageResult
      })
      return result
    },
    async editMessage(_: any, prop: GQLEditMessage) {
      return await Edit(prop.MessageEdit)
    },
    async removeMessage(_: any, prop: GQLRemoveMessage) {
      const messageResult = await Remove(prop.MessageRemove._id)
      const result = await ForumResolver.Mutation.removeMessageFromForum({}, {
        MessageEdit: prop.MessageRemove as any
      })
      return result
    },
  }
}

export default MessageResolver