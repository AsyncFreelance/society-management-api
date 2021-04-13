import { WalletModel } from "../../../models/Wallet/wallet.model"

const fetchWalletByUserID = async (userID: string) => {
    const wallet = await WalletModel.findOne({ userID })
    return wallet
}

export default fetchWalletByUserID