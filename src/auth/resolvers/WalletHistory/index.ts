import APIModel from "../../wrappers/APIGenerator"
import { WalletHistoryModel } from "../../models/WalletHistory/wallet_history.model"
import { IWalletHistoryGQLInput, IWalletHistoryDoc } from "../../models/WalletHistory/wallet_history.types"
import { getUnique } from "../../helpers/getUnique"
import PushNotification from "../PushNotification/"
import { UserModel } from "../../models/User/user.model"
import NotificationResolver from "../Notification"

const WalletHistory = new APIModel()
WalletHistory.setModel(WalletHistoryModel)
export const { Create, Edit, Fetch, FetchOne, Remove, Find } = WalletHistory.getAPICalls()

const WalletResolver = {
  Query: {
    async fetchWalletHistories() {
      const result = await Fetch()
      return result
    },

    async fetchSingleWalletHistory(_: any, prop: any) {
      const result = await FetchOne(prop._id)
      return result
    },

    async fetchWalletHistoriesByPhoneNumber(_: any, prop: any) {
      const fromResults = await Find({
        byPhoneNumber: true, from: prop.phoneNumber
      })

      const toResults = await Find({
        byPhoneNumber: true, to: prop.phoneNumber
      })
      return getUnique(fromResults, toResults, "_id")
    },

    async fetchWalletHistoriesByWalletID(_: any, prop: any) {
      const fromResults = await Find({
        byPhoneNumber: false, from: prop.walletID
      })

      const toResults = await Find({
        byPhoneNumber: false, to: prop.walletID
      })
      return getUnique(fromResults, toResults, "_id")
    },
    async fetchAllWalletHistoriesByPhoneNumber(_: any, prop: any) {
      // const foundHistories = await Find({  })
    }
  },

  Mutation: {
    async postWalletHistory(_: any, prop: IWalletHistoryGQLInput): Promise<IWalletHistoryDoc> {
      const result = await Create(prop.WalletHistoryInput) as unknown as IWalletHistoryDoc
      // Send notification
      let userFrom = null
      let userTo = null
      if (prop.WalletHistoryInput.byPhoneNumber) {
        userFrom = await UserModel.findOne({ phoneNumber: prop.WalletHistoryInput.from })
        userTo = await UserModel.findOne({ phoneNumber: prop.WalletHistoryInput.from })
      } else {
        userFrom = await UserModel.findOne({ _id: prop.WalletHistoryInput.from })
        userTo = await UserModel.findOne({ _id: prop.WalletHistoryInput.from })
      }

      if (userFrom?.appToken) {
        await PushNotification.Mutation.sendNotification({}, {
          appToken: userFrom.appToken,
          body: "Wallet has been debited " + prop.WalletHistoryInput.amount,
          title: "Wallet Debited"
        })
      }

      if (typeof userFrom?.appToken === "string") {
        await NotificationResolver.Mutation.postNotification({}, {
          input: {
            body: "Wallet has been debited " + prop.WalletHistoryInput.amount,
            title: "Wallet Debited",
            userID: userFrom._id
          }
        })
      }

      if (userTo?.appToken) {
        await PushNotification.Mutation.sendNotification({}, {
          appToken: userTo.appToken,
          body: "Wallet has been credited " + prop.WalletHistoryInput.amount,
          title: "Wallet Credited"
        })
      }

      if (typeof userTo?.appToken === "string") {
        await NotificationResolver.Mutation.postNotification({}, {
          input: {
            body: "Wallet has been credited " + prop.WalletHistoryInput.amount,
            title: "Wallet Credited",
            userID: userTo._id
          }
        })
      }

      return result
    },

    async editWalletHistory(_: any, prop: any) {
      const result = await Edit(prop.WalletHistoryInput)
      return result
    },

    async removeWalletHistory(_: any, prop: any) {
      const result = await Remove(prop._id)
      return result
    },
  }
}

export default WalletResolver