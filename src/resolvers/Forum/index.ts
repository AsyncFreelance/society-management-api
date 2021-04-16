import { ForumModel } from "../../models/Forums/forum.model"
import { GQLEditForum, GQLPostForum, IForumDocument } from "../../models/Forums/forum.types"
import { GQLEditMessage } from "../../models/Message/message.types"
import DBWrapper from "../../wrappers/APIGenerator"
import { constants } from "./subscriptions"
import { PubSub, withFilter } from "apollo-server-express"

const ModelForum = new DBWrapper(ForumModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelForum.getAPICalls()
const pubsub = new PubSub()

const ForumResolver = {
  Query: {
    async fetchForums(_: any, prop: any) {
      return await Fetch()
    },
    async fetchForumByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postForum(_: any, prop: GQLPostForum) {
      return await Create(prop.ForumInput)
    },
    async editForum(_: any, prop: GQLEditForum) {
      return await Edit(prop.ForumEdit)
    },
    async removeForum(_: any, prop: any) {
      return await Remove(prop._id)
    },
    async addMessageToForum(_: any, prop: GQLEditMessage) {
      const foundForum = await FetchOne(prop.MessageEdit.forumID) as IForumDocument
      if (foundForum) {
        const messages = foundForum.messages.concat(prop.MessageEdit)
        const editedForum = await Edit({
          _id: prop.MessageEdit.forumID,
          messages
        })
        await pubsub.publish(constants.MESSAGE_UPDATED, { forumUpdate: editedForum })
        return editedForum
      } else {
        return null
      }
    },
    async removeMessageFromForum(_: any, prop: GQLEditMessage) {
      const foundForum = await FetchOne(prop.MessageEdit.forumID) as IForumDocument
      if (foundForum) {
        const messages = foundForum.messages.filter((message: any) => String(message._id) !== String(prop.MessageEdit._id))
        return await Edit({
          _id: prop.MessageEdit.forumID,
          messages
        })
      } else {
        return null
      }
    },
  },
  Subscription: {
    forumUpdate: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(constants.MESSAGE_UPDATED),
        (payload, variables) => {
          return true
        },
      ),
    }
  }
}

export default ForumResolver