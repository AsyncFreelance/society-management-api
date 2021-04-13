import { DefaultTransactionInput, DefaultTransactionReport } from "../../../models/Wallet/wallet.types"
import { WalletModel } from "../../../models/Wallet/wallet.model"
import { formatError } from "../../../helpers/formatError"

const debitWallet = async (transactionInput: DefaultTransactionInput): Promise<DefaultTransactionReport> => {
    const foundReceiverWallet = await WalletModel.findOne({ _id: transactionInput.accountID })
    if (!foundReceiverWallet) {
        return formatError({ type: 400, message: "Wallet does not exist" }) as any
    }

    // Crediting
    await WalletModel.updateOne({ _id: transactionInput.accountID }, { amount: Number(foundReceiverWallet.amount - transactionInput.amount) })
        .catch(err => formatError({ type: 500, message: String(err) }))

    return {
        ...transactionInput,
        success: true,
        transactionID: "ssdvsdv"
    }
}

export default debitWallet