import { WalletModel } from "../../../models/Wallet/wallet.model"
import { IWalletInput, IWalletDoc } from "../../../models/Wallet/wallet.types"
import { formatError } from "../../../helpers/formatError"

const postWallets = async (walletInput: IWalletInput): Promise<IWalletDoc> => {
    return await WalletModel.create({ ...walletInput })
        .then(createdWallet => createdWallet)
        .catch(err => formatError(err) as any)
}

export default postWallets