import { gql } from 'apollo-server-express'

export default gql`

extend type Query {
    fetchMessages: [MessageDoc!]
    fetchMessageByID(_id: String!): MessageDoc
}

extend type Mutation {
    postMessage(MessageInput: MessageInput!): ForumDoc
    editMessage(MessageEdit: MessageEdit!): MessageDoc
    removeMessage(MessageRemove: MessageRemove!): ForumDoc
}

type MessageDoc {
    _id: String
    forumID: String
    message: String
    from: String
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input MessageDocForum {
    _id: String!
    forumID: String!
    message: String!
    from: String!
    createdAt: String
    updatedAt: String
}

input MessageInput {
    forumID: String!
    message: String!
    from: String!
}

input MessageEdit {
    _id: String!
    forumID: String!
    message: String!
    from: String!
}

input MessageRemove {
    _id: String!
    forumID: String!
}


`