import { TransactionInput, TransactionReport } from "../../../models/Wallet/wallet.types"
import { WalletModel } from "../../../models/Wallet/wallet.model"
import { GlobalConfigModel } from "../../../models/GlobalConfigs/global_configs.model"
import { formatError } from "../../../helpers/formatError"

const transferWalletByPhoneNumber = async (transactionInput: TransactionInput): Promise<TransactionReport> => {
  const foundPayerWallet = await WalletModel.findOne({ phoneNumber: transactionInput.from })
  if (!foundPayerWallet) {
    return formatError({ type: 400, message: "Payer Wallet does not exist" }) as any
  }

  const foundReceiverWallet = await WalletModel.findOne({ phoneNumber: transactionInput.to })
  if (!foundReceiverWallet) {
    return formatError({ type: 400, message: "Receiver Wallet does not exist" }) as any
  }

  // Adding transaction Fee to revenue
  const configResults = await GlobalConfigModel.find({})
  const result = {
    amount: transactionInput.totalAmount - transactionInput.amount,
    timestamp: String(new Date()),
    from: String(foundPayerWallet._id),
    byPhoneNumber: true
  }
  const collectionRevenue = configResults[0] ? configResults[0].totalRevenue ? configResults[0].totalRevenue : null : null
  if (collectionRevenue) {
    await GlobalConfigModel.updateOne({ _id: String(configResults[0]._id) }, { totalRevenue: collectionRevenue.concat(result) })
  } else {
    await GlobalConfigModel.create({ totalRevenue: [result] })
  }

  if (Number(foundPayerWallet.amount - transactionInput.totalAmount) < 0) {
    return {
      error: {
        type: 400,
        message: "You don't have enough funds for transfer"
      }
    } as any
  }

  // Debiting
  await WalletModel.updateOne({ _id: foundPayerWallet.id }, { amount: Number(foundPayerWallet.amount - transactionInput.totalAmount) })
    .catch(err => formatError({ type: 500, message: String(err) }))

  //  Crediting
  await WalletModel.updateOne({ _id: foundReceiverWallet.id }, { amount: Number(foundReceiverWallet.amount + transactionInput.amount) })
    .catch(err => formatError({ type: 500, message: String(err) }))

  return {
    ...transactionInput,
    success: true,
  }
}

export default transferWalletByPhoneNumber