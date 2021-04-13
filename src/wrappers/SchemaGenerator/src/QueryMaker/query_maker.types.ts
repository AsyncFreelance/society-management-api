import { ISingleSchema } from "../SingleSchema/single_schema.types"

export interface SingleQuery {
    queryName: string
    inputs: IQueryInputs[]
    returnType: IQueryReturnType
}

export enum QueryTypes {
    QUERY = "Query",
    MUTATION = "Mutation"
}

export interface IQueryMakerInit {
    queries: SingleQuery[]
    isExtended?: boolean
    queryType?: QueryTypes
}

export interface IQueryMaker {
    queries: SingleQuery[]
    getBuiltSchema: () => string
    getBuiltSingleSchema: (singleQuery: SingleQuery) => string
    isExtended?: boolean
    queryType?: QueryTypes
}

export interface IQueryInputs {
    isRequired: boolean
    name: string
    model: ISingleSchema
}

export enum ReturnTypes {
    ARRAY = "arr",
    OBJECT = "obj"
}

export interface IQueryReturnType {
    isObjectRequired: boolean
    isArrayRequired: boolean
    type: ReturnTypes
    model: ISingleSchema
}