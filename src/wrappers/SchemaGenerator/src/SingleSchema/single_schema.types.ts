export interface ISingleSchema {
    schema: ISchema
    schemaType: string
    getSchema: () => ISchema
    getBuiltSchema: () => string
    getSchemaName: () => string
}

export const schemaTypes = {
    "INPUT": "input",
    "TYPE": "type"
}

export enum SchemaTypes {
    INPUT = "input",
    TYPE = "type"
}

export interface ISchema {
    props: object
    name: string
}