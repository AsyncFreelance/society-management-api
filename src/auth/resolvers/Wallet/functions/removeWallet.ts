import { WalletModel } from "../../../models/Wallet/wallet.model"
import { IWalletDoc } from "../../../models/Wallet/wallet.types"
import { formatError } from "../../../helpers/formatError"

const removeWallet = async (_id: string): Promise<IWalletDoc> => {
    const foundWallet = await WalletModel.findOne({ _id })
    if (!foundWallet) {
        return formatError({ type: 400, message: "Wallet does not exist" }) as any
    }
    return await WalletModel.deleteOne({ _id })
        .then(() => foundWallet)
        .catch(err => formatError(err) as any)
}

export default removeWallet