const GraphQLMerger = require("../../dist/GraphQLMerger/graphql_merger.model").default

describe('Name of the group', () => {
    test('should ', () => {
        const server = new GraphQLMerger({
            typeDefs: [], resolvers: []
        })
        server.attachSchema("schema")
        server.attachResolver({ one: 1 })
        expect(server.getTypeDefs()).toContainEqual("schema")
        expect(server.getResolvers()).toContainEqual({ one: 1 })
    })
})