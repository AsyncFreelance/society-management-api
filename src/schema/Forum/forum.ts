import { gql } from 'apollo-server-express'

export default gql`

extend type Query {
    fetchForums: [ForumDoc!]
    fetchForumByID(_id: String!): ForumDoc
}

extend type Mutation {
    postForum(ForumInput: ForumInput!): ForumDoc
    editForum(ForumEdit: ForumEdit!): ForumDoc
    addMessageToForum(MessageEdit: MessageDocForum): ForumDoc
    removeMessageFromForum(MessageEdit: MessageDocForum): ForumDoc
    removeForum(_id: String!): ForumDoc
}

type IMessageDoc {
    _id: String
    forumID: String
    from: String
    message: String
    createdAt: String
    updatedAt: String
}

input IMessageEdit {
    _id: String!
    forumID: String!
    from: String!
    message: String!
    createdAt: String
    updatedAt: String
}

input IMessageRemove {
    _id: String!
    forumID: String!
}

type ForumDoc {
    _id: String
    messages: [IMessageDoc]
    title: String
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input ForumInput {
    title: String
}

input ForumEdit {
    _id: String!
    title: String
    messages: [IMessageEdit!]
}


`