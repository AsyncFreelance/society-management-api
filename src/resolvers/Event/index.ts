import { EventModel } from "../../models/Events/event.model"
import { GQLEditEvent, GQLPostEvent } from "../../models/Events/event.types"
import DBWrapper from "../../wrappers/APIGenerator"

const ModelBill = new DBWrapper(EventModel)
const { Create, Edit, Fetch, FetchOne, Remove } = ModelBill.getAPICalls()

const EventResolver = {
  Query: {
    async fetchEvents(_: any, prop: any) {
      return await Fetch()
    },
    async fetchEventByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postEvent(_: any, prop: GQLPostEvent) {
      return await Create(prop.EventInput)
    },
    async editEvent(_: any, prop: GQLEditEvent) {
      return await Edit(prop.EventEdit)
    },
    async removeEvent(_: any, prop: any) {
      return await Remove(prop._id)
    },
  }
}

export default EventResolver