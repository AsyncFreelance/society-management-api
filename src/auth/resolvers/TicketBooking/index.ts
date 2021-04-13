import { TicketBookingModel } from "../../models/TicketBooking/ticket_booking.model"
import { GQLTicketBookingEdit, GQLTicketBookingInput } from "../../models/TicketBooking/ticket_booking.types"
import DBWrapper from "../../wrappers/APIGenerator/"

const ModelTicket = new DBWrapper(TicketBookingModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelTicket.getAPICalls()

const TicketBookingResolver = {
  Query: {
    async fetchTicketBookings(_: any, prop: any) {
      return await Fetch()
    },
    async fetcheTicketBookingByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postTicketBooking(_: any, prop: GQLTicketBookingInput) {
      return await Create(prop.TicketBookingInput)
    },
    async editTicketBooking(_: any, prop: GQLTicketBookingEdit) {
      return await Edit(prop.TicketBookingEdit)
    },
    async removeTicketBooking(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default TicketBookingResolver