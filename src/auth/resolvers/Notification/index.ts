import { NotificationModel } from "../../models/Notifications/notification.model"
import { PostNotification, ChangeReadStatus, FetchNotificationsByUserID, ChangeMultipleReadStatus } from "../../models/Notifications/notification.types"
import DBModel from "../../wrappers/APIGenerator"

const NotificationDBModel = new DBModel()
NotificationDBModel.setModel(NotificationModel)
const { Create, Fetch, Edit, Find } = NotificationDBModel.getAPICalls()

const NotificationResolver = {
  Query: {
    async fetchNotifications(_: any, prop: any) {
      return await Fetch()
    },
    async fetchNotificationsByUserID(_: any, prop: FetchNotificationsByUserID) {
      return await Find({ userID: prop.userID })
    }
  },

  Mutation: {
    async postNotification(_: any, prop: PostNotification) {
      const response = await Create(prop.input)
      return response
    },
    async changeNotificationReadStatus(_: any, prop: ChangeReadStatus) {
      return await Edit({ _id: prop._id, readStatus: true })
    },
    async changeMultipleNotificationReadStatus(_:any, prop: ChangeMultipleReadStatus) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < prop._ids.length; ++i) {
        await NotificationResolver.Mutation.changeNotificationReadStatus({}, {
          _id: prop._ids[i]
        })
      }
      return true
    }
  }
}

export default NotificationResolver