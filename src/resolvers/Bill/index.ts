import { BillModel } from "../../models/Bill/bill.model"
import { GQLEditBill, GQLPostBill, GQLVoteInput, IBillDoc } from "../../models/Bill/bill.types"
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
    async yesVote(_: any, prop: GQLVoteInput) {
      const foundBill = await FetchOne(prop._id) as IBillDoc
      if (!foundBill.error) {
        const foundIndex = foundBill.voteIDs.findIndex(userID => String(userID) === String(prop.userID))
        if (foundIndex < 0) {
          const voteIDs = foundBill.voteIDs.concat(prop.userID)
          const yes_votes = foundBill.yes_votes + 1
          return await Edit({
            _id: prop._id,
            yes_votes,
            voteIDs
          })
        } else {
          return foundBill
        }
      } else {
        return null
      }
    },
    async noVote(_: any, prop: GQLVoteInput) {
      const foundBill = await FetchOne(prop._id) as IBillDoc
      if (!foundBill.error) {
        const foundIndex = foundBill.voteIDs.findIndex(userID => String(userID) === String(prop.userID))
        if (foundIndex < 0) {
          const voteIDs = foundBill.voteIDs.concat(prop.userID)
          const no_votes = foundBill.no_votes + 1
          return await Edit({
            _id: prop._id,
            no_votes,
            voteIDs
          })
        } else {
          return foundBill
        }
      } else {
        return null
      }
    },
    async abstainVote(_: any, prop: GQLVoteInput) {
      const foundBill = await FetchOne(prop._id) as IBillDoc
      if (!foundBill.error) {
        const foundIndex = foundBill.voteIDs.findIndex(userID => String(userID) === String(prop.userID))
        if (foundIndex < 0) {
          const voteIDs = foundBill.voteIDs.concat(prop.userID)
          const abstain_votes = foundBill.abstain_votes + 1
          return await Edit({
            _id: prop._id,
            abstain_votes,
            voteIDs
          })
        } else {
          return foundBill
        }
      } else {
        return null
      }
    }
  }
}

export default BillResolver