const SingleSchemaModel = require('../../dist/SingleSchema/single_schema.model').default
const { SchemaTypes } = require('../../dist/SingleSchema/single_schema.types')

/**
 * type User {
    name: String
    age: Int
 * }
 */

const log = (stamement, func = "log") => console[func](stamement)

describe('Name of the group', () => {
    test('should ', () => {
        const input = {
            props: {
                name: 'String',
                age: 'Int'
            },
            name: 'User'
        }
        const expectedResult = `type User {\n\tname: String\n\tage: Int\n}`
        const NewSingleSchema = new SingleSchemaModel(input, "type")
        expect(NewSingleSchema.getSchema()).toEqual(input)
        const result = NewSingleSchema.getBuiltSchema()
        log(result, "info")
        log(expectedResult, "warn")
        expect(result).toEqual(expectedResult)
    });
});