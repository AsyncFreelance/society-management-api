import { UserModel } from "../../models/User/user.model"
import { GQLEditUser, GQLPostUser, GQLLoginInput, IUserDocument } from "../../models/User/user.types"
import DBWrapper from "../../wrappers/APIGenerator"

const ModelUser = new DBWrapper(UserModel)
const { Create, Edit, Fetch, FetchOne, Remove, Find } = ModelUser.getAPICalls()

const UserResolver = {
  Query: {
    async fetchUsers(_: any, prop: any) {
      return await Fetch()
    },
    async fetchUserByID(_: any, prop: any) {
      return await FetchOne(prop._id)
    }
  },

  Mutation: {
    async postUser(_: any, prop: GQLPostUser) {
      return await Create(prop.UserInput)
    },
    async editUser(_: any, prop: GQLEditUser) {
      return await Edit(prop.UserEdit)
    },
    async removeUser(_: any, prop: any) {
      return await Remove(prop._id)
    },
    async signUp(_: any, prop: GQLPostUser) {
      return await UserResolver.Mutation.postUser({}, prop)
    },
    async login(_: any, prop: GQLLoginInput) {
      const foundUser = await FetchOne(prop.LoginInput.email, "email") as any
      if (!foundUser.error) {
        if (foundUser.password === prop.LoginInput.password) {
          return foundUser
        } else {
          return {
            error: {
              type: 400,
              message: "Incorrect Password"
            }
          }
        }
      } else {
        return foundUser
      }
    }
  }
}

export default UserResolver