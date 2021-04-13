import { PushNotification, PushNotificationDoc } from "../../models/PushNotification/push_notification.types"
import sendNotification from "../../push_notifications/send_notification"

const PushNotification = {
  Mutation: {
    async sendNotification(_: any, prop: PushNotification): Promise<PushNotificationDoc> {
      await sendNotification(prop.appToken, {
        body: prop.body,
        title: prop.title
      })
      return prop
    }
  }
}

export default PushNotification