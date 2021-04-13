import { gql } from "apollo-server-express"
import NoticeRefs from "./Notice/notice"
import EventRefs from "./Event/event"
import BillRefs from "./Bill/bill"
import ForumRefs from "./Forum/forum"
import MessageRefs from "./Message/message"
import UserRefs from "./User/user"

const Linker = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type ErrorType {
    type: Int
    message: String
  }
`

export default [
  Linker, NoticeRefs, EventRefs, BillRefs, ForumRefs, MessageRefs, UserRefs
]