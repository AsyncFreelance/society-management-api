import { IResolvers } from "graphql-tools"
import fetchWallets from "./functions/fetchWallets"
import postWallet from "./functions/postWallet"
import editWallet from "./functions/editWallet"
import removeWallet from "./functions/removeWallet"
import creditWallet from "./functions/creditWallet"
import debitWallet from "./functions/debitWallet"
import fetchWalletByUserID from "./functions/fetchWalletByUserID"
import transferWallet from "./functions/transferWallet"
import transferWalletByPhoneNumber from "./functions/transferWalletByPhoneNumber"
import { disableWalletPayment, enableWalletPayment } from "./functions/setupWalletPayment"
import WalletHistory from "../WalletHistory/index"
import { OrderPay, TransactionWalletInput, TransactionPhoneNumberInput } from "../../models/Wallet/wallet.types"
import { WalletModel } from "../../models/Wallet/wallet.model"
import { ProductModel } from "../../models/ProductUpdated/product.model"

const WalletResolver: IResolvers = {
  Query: {
    async fetchWallets() {
      const result = await fetchWallets()
      return result
    },

    async fetchWalletByUserID(_: any, prop: any) {
      const result = await fetchWalletByUserID(prop.userID)
      return result
    }
  },

  Mutation: {
    async postWallet(_: any, prop: any) {
      const result = await postWallet(prop.WalletInput)
      return result
    },

    async editWallet(_: any, prop: any) {
      const result = await editWallet(prop.WalletInput)
      return result
    },

    async removeWallet(_: any, prop: any) {
      const result = await removeWallet(prop._id)
      return result
    },

    async transferWallet(_: any, prop: TransactionWalletInput) {
      const result = await transferWallet(prop.TransactionInput) as any
      if (!result.error) {
        const response = await WalletHistory.Mutation.postWalletHistory({}, {
          WalletHistoryInput: {
            amount: result.amount,
            byPhoneNumber: false,
            from: result.from,
            to: result.to,
            reason_from: prop.TransactionInput.reason_from,
            reason_to: prop.TransactionInput.reason_to
          }
        })
        return { ...result, transactionID: response._id }
      } else {
        return result
      }
    },
    async creditWallet(_: any, prop: any) {
      const result = await creditWallet(prop.TransactionInput)
      return result
    },
    async debitWallet(_: any, prop: any) {
      const result = await debitWallet(prop.TransactionInput)
      return result
    },
    async transferWalletByPhoneNumber(_: any, prop: TransactionPhoneNumberInput) {
      const result = await transferWalletByPhoneNumber(prop.TransactionInput) as any
      if (!result.error) {
        const response = await WalletHistory.Mutation.postWalletHistory({}, {
          WalletHistoryInput: {
            amount: result.amount,
            byPhoneNumber: true,
            from: result.from,
            to: result.to,
            reason_from: prop.TransactionInput.reason_from,
            reason_to: prop.TransactionInput.reason_to,
          }
        })
        return { ...result, transactionID: response._id }
      } else {
        return result
      }
    },
    async disableWalletPayment(_: any, prop: any) {
      const result = await disableWalletPayment(prop._id)
      return result
    },
    async enableWalletPayment(_: any, prop: any) {
      const result = await enableWalletPayment(prop._id)
      return result
    },
    async orderPayByWallet(_: any, prop: OrderPay) {
      const AllWallets = await WalletModel.find({})

      const AllProducts = await ProductModel.find({})
      const supplierWalletPhoneNumbers: string[] = []
      prop.orderPayInput.productsID.forEach(productID => {
        const foundSupplierIndex = AllProducts.findIndex(product => String(product._id) === productID)
        let userID = ""
        if (foundSupplierIndex >= 0) {
          userID = AllProducts[foundSupplierIndex].supplierID
        }
        const foundIndex = AllWallets.findIndex(walletDoc => walletDoc.userID === userID)
        if (foundIndex >= 0 && userID.length > 0) {
          supplierWalletPhoneNumbers.push(String(AllWallets[foundIndex].phoneNumber))
        }
      })
      supplierWalletPhoneNumbers.forEach(async (supplierPhoneNumber, idx) => {
        await transferWalletByPhoneNumber({
          amount: prop.orderPayInput.supplierAmounts[idx],
          from: prop.orderPayInput.buyerPhoneNumber,
          to: supplierPhoneNumber,
          totalAmount: prop.orderPayInput.supplierAmounts[idx],
          reason_from: "Payed Order",
          reason_to: "Received Order"
        })
      })
      // Shemsu Pay
      const ids = await WalletModel.find({})
      const shemsuPhoneNumber = ids[0].phoneNumber as string
      await transferWalletByPhoneNumber({
        amount: prop.orderPayInput.fee,
        from: prop.orderPayInput.buyerPhoneNumber,
        to: shemsuPhoneNumber,
        totalAmount: prop.orderPayInput.fee
      })

      // Pay bank fee
      await transferWalletByPhoneNumber({
        amount: prop.orderPayInput.bankFee,
        from: prop.orderPayInput.buyerPhoneNumber,
        to: shemsuPhoneNumber,
        totalAmount: prop.orderPayInput.bankFee
      })

      const response = await WalletHistory.Mutation.postWalletHistory({}, {
        WalletHistoryInput: {
          amount: prop.orderPayInput.totalAmount,
          byPhoneNumber: true,
          from: prop.orderPayInput.buyerPhoneNumber,
          to: shemsuPhoneNumber
        }
      })
      return response
    }
  }
}

export default WalletResolver