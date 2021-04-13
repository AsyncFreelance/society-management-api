import { gql } from 'apollo-server-express'

export default gql`

extend type Query {
    fetchBills: [BillDoc!]
    fetchBillByID(_id: String!): BillDoc
}

extend type Mutation {
    postBill(BillInput: BillInput!): BillDoc
    editBill(BillEdit: BillEdit!): BillDoc
    removeBill(_id: String!): BillDoc
}

type BillDoc {
    _id: String
    message: String
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input BillInput {
    message: String
}

input BillEdit {
    _id: String!
    message: String
}


`