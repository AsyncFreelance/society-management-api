import { WalletModel } from "../../../models/Wallet/wallet.model"
import { IWalletEdit, IWalletDoc } from "../../../models/Wallet/wallet.types"
import { formatError } from "../../../helpers/formatError"

const editWallets = async (walletInput: IWalletEdit): Promise<IWalletDoc> => {
    const foundWallet = await WalletModel.findOne({ _id: walletInput._id })
    if (!foundWallet) {
        return formatError({ type: 400, message: "Wallet does not exist" }) as any
    }

    return await WalletModel.updateOne({ _id: walletInput._id }, { ...walletInput })
        .then(() => ({
            _id: walletInput._id? walletInput._id : foundWallet._id,
            amount: walletInput.amount? walletInput.amount : foundWallet.amount,
            userID: walletInput.userID? walletInput.userID : foundWallet.userID,
            phoneNumber: walletInput.phoneNumber? walletInput.phoneNumber : foundWallet.phoneNumber,
            pinNumber: walletInput.pinNumber? walletInput.pinNumber : foundWallet.pinNumber,
            hasPaymentVerified: foundWallet.hasPaymentVerified,
            createdAt: foundWallet.createdAt,
            updatedAt: foundWallet.updatedAt,
        }))
        .catch(err => formatError(err) as any)
}

export default editWallets