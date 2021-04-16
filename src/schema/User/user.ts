import { gql } from 'apollo-server-express'

export default gql`

extend type Query {
    fetchUsers: [UserDoc!]
    fetchUserByID(_id: String!): UserDoc
}

extend type Mutation {
    postUser(UserInput: UserInput!): UserDoc
    editUser(UserEdit: UserEdit!): UserDoc
    removeUser(_id: String!): UserDoc
    signUp(UserInput: UserInput!): UserDoc
    login(LoginInput: ILogin): UserDoc
}

input ILogin {
    email: String
    password: String
    isAdmin: Boolean
}

type UserDoc {
    _id: String
    firstName: String
    lastName: String
    email: String
    password: String
    isAdmin: Boolean
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    isAdmin: Boolean
}

input UserEdit {
    _id: String!
    firstName: String
    lastName: String
    email: String
    password: String
    isAdmin: Boolean
}


`