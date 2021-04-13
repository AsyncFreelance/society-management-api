import { HotelModel } from "../../models/Hotel/hotel.model"
import { HotelEdit, HotelInput } from "../../models/Hotel/hotel.types"
import DBWrapper from "../../wrappers/APIGenerator"

const ModelHotel = new DBWrapper(HotelModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelHotel.getAPICalls()

const HotelResolver = {
  Query: {
    async fetchHotels(_: any, prop: any) {
      return await Fetch()
    },
    async fetcheHotelByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postHotel(_: any, prop: HotelInput) {
      return await Create(prop.HotelInput)
    },
    async editHotel(_: any, prop: HotelEdit) {
      return await Edit(prop.HotelEdit)
    },
    async removeHotel(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default HotelResolver