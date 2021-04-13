import { gql } from 'apollo-server-express'

export default gql`

extend type Query {
    fetchEvents: [EventDoc!]
    fetchEventByID(_id: String!): EventDoc
}

extend type Mutation {
    postEvent(EventInput: EventInput!): EventDoc
    editEvent(EventEdit: EventEdit!): EventDoc
    removeEvent(_id: String!): EventDoc
}

type EventDoc {
    _id: String
    message: String
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input EventInput {
    message: String
}

input EventEdit {
    _id: String!
    message: String
}


`