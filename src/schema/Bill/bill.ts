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
    yesVote(_id: String!, userID: String!): BillDoc
    noVote(_id: String!, userID: String!): BillDoc
    abstainVote(_id: String!, userID: String!): BillDoc
}

type BillDoc {
    _id: String
    name: String
    pollDescription: String
    voteLimit: Int
    yes_votes: Int
    no_votes: Int
    abstain_votes: Int
    voteIDs: [String]
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input BillInput {
    name: String
    pollDescription: String
    voteLimit: Int
}

input BillEdit {
    _id: String!
    name: String
    pollDescription: String
    voteLimit: Int
    yes_votes: Int
    no_votes: Int
    abstain_votes: Int
}


`