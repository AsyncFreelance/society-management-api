export interface IGrqphQLMerger {
    typeDefs: any[]
    resolvers: any[]
    getTypeDefs: () => string[]
    getResolvers: () => object[]
}

export interface IGraphQLMergerInit {
    typeDefs: any[]
    resolvers: any[]
}