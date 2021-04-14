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
    title: String
    location: String
    postedBy: String
    description: String
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input EventInput {
    title: String!
    location: String!
    postedBy: String!
    description: String!
}

input EventEdit {
    _id: String!
    title: String
    location: String
    postedBy: String
    description: String
}


`