import { BillModel } from "../../models/Bill/bill.model"
import { GQLEditBill, GQLPostBill } from "../../models/Bill/bill.types"
import DBWrapper from "../../wrappers/APIGenerator"

const ModelBill = new DBWrapper(BillModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelBill.getAPICalls()

const BillResolver = {
  Query: {
    async fetchBills(_: any, prop: any) {
      return await Fetch()
    },
    async fetchBillByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postBill(_: any, prop: GQLPostBill) {
      return await Create(prop.BillInput)
    },
    async editBill(_: any, prop: GQLEditBill) {
      return await Edit(prop.BillEdit)
    },
    async removeBill(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default BillResolver