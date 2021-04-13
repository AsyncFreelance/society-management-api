import { gql } from 'apollo-server-express'

export default gql`

extend type Query {
    fetchNotices: [NoticeDoc!]
    fetchNoticeByID(_id: String!): NoticeDoc
}

extend type Mutation {
    postNotice(NoticeInput: NoticeInput!): NoticeDoc
    editNotice(NoticeEdit: NoticeEdit!): NoticeDoc
    removeNotice(_id: String!): NoticeDoc
}

type NoticeDoc {
    _id: String
    message: String
    error: ErrorType
    createdAt: String
    updatedAt: String
}

input NoticeInput {
    message: String
}

input NoticeEdit {
    _id: String!
    message: String
}


`