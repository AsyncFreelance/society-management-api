import { Model, Document } from "mongoose"
import { getError } from "../../helpers/formatError"

class API {
  schema = ""
  model: Model<Document> | undefined

  constructor(modelInput?: Model<Document>) {
    if (modelInput) {
      this.model = modelInput
    }
  }

  getSchema = () => this.schema

  setSchema = (schemaString: string) => this.schema = schemaString

  getModel = () => this.model

  setModel = (model: any) => this.model = model

  defaultCallback = async (data: any, err: any = null): Promise<void | null> => null

  getAPICalls = () => ({
    Fetch: async (callback = this.defaultCallback) => {
      const response = await this.model?.find({})
      callback(response, null)
      return response
    },
    Find: async (finObj = {}, callback = this.defaultCallback) => {
      const response = await this.model?.find(finObj)
      callback(response, null)
      return response
    },
    FetchOne: async (tagValue: string, fetchTag: string = "_id", callback = this.defaultCallback) => {
      const foundItem: any = await this.model?.findOne({ [fetchTag]: tagValue })
      if (!foundItem) {
        callback(null, getError(400, "Item could not be found"))
        return getError(400, "Item could not be found")
      }
      callback(foundItem)
      return foundItem
    },
    Edit: async (prop: any, callback = this.defaultCallback) => {
      const foundItem: any = await this.model?.findOne({ _id: prop._id })
      if (!foundItem) {
        callback(null, getError(400, "Item could not be found"))
        return getError(400, "Item could not be found")
      }
      const objectProps: any = {}
      for (const item in foundItem.toJSON()) {
        if (item) {
          objectProps[item] = foundItem[item]
        }
      }
      const editResponse = {
        ...prop,
        updatedAt: String(new Date())
      }
      return await this.model?.updateOne({ _id: prop._id }, editResponse)
        .then(() => {
          const data = {
            ...objectProps,
            ...editResponse
          }
          callback(data, null)
          return data
        })
        .catch(err => {
          callback(null, getError(500, err))
          return getError(500, err)
        })
    },
    Create: async (prop: any, callback = this.defaultCallback) => {
      return await this.model?.create(prop)
        .then(newUser => {
          callback(newUser, null)
          return newUser
        })
        .catch(err => {
          callback(null, getError(500, err))
          return getError(500, err)
        })
    },
    Remove: async (_id: string, callback = this.defaultCallback) => {
      const foundItem: any = await this.model?.findOne({ _id })
      if (!foundItem) {
        callback(null, getError(400, "Item could not be found"))
        return getError(400, "Item could not be found")
      }
      const objectProps: any = {}
      for (const item in foundItem.toJSON()) {
        if (item) {
          objectProps[item] = foundItem[item]
        }
      }
      return await this.model?.deleteOne({ _id })
        .then(() => {
          callback(objectProps, null)
          return objectProps
        })
        .catch(err => {
          callback(null, getError(500, err))
          return getError(500, err)
        })
    }
  })
}

export default API