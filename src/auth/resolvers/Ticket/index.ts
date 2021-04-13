import { TicketModel } from "../../models/Ticket/ticket.model"
import { TicketEdit, TicketInput } from "../../models/Ticket/ticket.types"
import DBWrapper from "../../wrappers/APIGenerator/"

const ModelTicket = new DBWrapper(TicketModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelTicket.getAPICalls()

const TicketResolver = {
  Query: {
    async fetchTickets(_: any, prop: any) {
      return await Fetch()
    },
    async fetcheTicketByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postTicket(_: any, prop: TicketInput) {
      return await Create(prop.TicketInput)
    },
    async editTicket(_: any, prop: TicketEdit) {
      return await Edit(prop.TicketEdit)
    },
    async removeTicket(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default TicketResolver