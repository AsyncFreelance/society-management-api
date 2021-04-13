import { ISchema, ISingleSchema, SchemaTypes } from "./single_schema.types"

export default class SingleSchemaModel implements ISingleSchema {
    schema: ISchema
    schemaType: string
    constructor(schema: ISchema, type: SchemaTypes) {
        this.schema = schema
        this.schemaType = type
    }

    getSchema = () => this.schema

    getBuiltSchema = () => {
        let totalString = ''
        const Schema = this.schema as any
        totalString += `${this.schemaType} ${Schema.name} {\n`
        for (let key in Schema.props) {
            totalString += `\t${key}: ${Schema.props[key]}\n`
        }
        totalString += '}'

        return totalString
    }

    getSchemaName = () => this.schema.name
}