import { WalletModel } from "../../../models/Wallet/wallet.model"
import { IWalletDoc } from "../../../models/Wallet/wallet.types"
import { formatError } from "../../../helpers/formatError"

export const disableWalletPayment = async (_id: string): Promise<IWalletDoc[]>=> {
    const foundWallet = await WalletModel.findOne({ _id })
    if (!foundWallet) {
        return formatError({ type: 400, message: "Wallet does not exist" }) as any
    }

    return await WalletModel.updateOne({ _id }, { hasPaymentVerified: false })
        .then(() => ({
            _id: foundWallet._id,
            amount: foundWallet.amount,
            userID: foundWallet.userID,
            hasPaymentVerified: false,
        }))
        .catch(err => formatError({ type: 500, message: String(err) }) as any)
}

export const enableWalletPayment = async (_id: string) => {
    const foundWallet = await WalletModel.findOne({ _id })
    if (!foundWallet) {
        return formatError({ type: 400, message: "Wallet does not exist" }) as any
    }

    return await WalletModel.updateOne({ _id }, { hasPaymentVerified: true })
        .then(() => ({
            _id: foundWallet._id,
            amount: foundWallet.amount,
            userID: foundWallet.userID,
            hasPaymentVerified: true,
        }))
        .catch(err => formatError({ type: 500, message: String(err) }) as any)
}