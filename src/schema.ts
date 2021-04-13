import "graphql-import-node"
import typeDefs from "./schema/"
import resolvers from "./resolvers/"
import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs, resolvers
})

export default schema