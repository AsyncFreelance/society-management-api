import { IGrqphQLMerger, IGraphQLMergerInit } from "./graphql_merger.types"

export default class GraphQLMerger implements IGrqphQLMerger {
  constructor(input?: IGraphQLMergerInit) {
    if (input) {
      this.typeDefs = input.typeDefs
      this.resolvers = input.resolvers
    }
  }

  typeDefs: any[] = [];
  resolvers: any[] = [];

  getTypeDefs = (): string[] => {
    return this.typeDefs
  }

  getResolvers = (): object[] => {
    return this.resolvers
  }

  attachSchema = (schema: string) => {
    this.typeDefs.push(schema)
  }

  attachResolver = (resolver: object) => {
    this.resolvers.push(resolver)
  }
}