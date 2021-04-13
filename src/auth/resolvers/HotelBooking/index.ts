import { HotelBookingModel } from "../../models/HotelBooking/hotel_booking.model"
import { GQLHotelBookingEdit, GQLHotelBookingInput } from "../../models/HotelBooking/hotel_booking.types"
import DBWrapper from "../../wrappers/APIGenerator"

const ModelTicket = new DBWrapper(HotelBookingModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelTicket.getAPICalls()

const HotelBookingResolver = {
  Query: {
    async fetchHotelBookings(_: any, prop: any) {
      return await Fetch()
    },
    async fetcheHotelBookingByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postHotelBooking(_: any, prop: GQLHotelBookingInput) {
      return await Create(prop.HotelBookingInput)
    },
    async editHotelBooking(_: any, prop: GQLHotelBookingEdit) {
      return await Edit(prop.HotelBookingEdit)
    },
    async removeHotelBooking(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default HotelBookingResolver