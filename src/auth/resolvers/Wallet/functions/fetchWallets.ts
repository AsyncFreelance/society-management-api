import { WalletModel } from "../../../models/Wallet/wallet.model"

const fetchWallets = async () => {
    const wallets = await WalletModel.find({})
    return wallets
}

export default fetchWallets