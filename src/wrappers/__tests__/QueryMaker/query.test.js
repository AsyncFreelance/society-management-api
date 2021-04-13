const QueryMaker = require('../../dist/QueryMaker/query_maker.model').default
const SingleSchema = require('../../dist/SingleSchema/single_schema.model').default
const log = require('../../helpers/log')

describe('Name of the group', () => {
    test('should ', () => {
        const UserSchema = new SingleSchema({
            name: "User",
            props: {
                name: 'String',
                age: 'Int'
            }
        }, "type")
        const UserInput = new SingleSchema({
            name: "UserInput",
            props: {
                name: "String!",
                age: "Int!"
            }
        }, "input")
        const Meta = new SingleSchema({
            name: "Meta",
            props: {
                one: "Int!"
            }
        }, "input")
        const queryInput = {
            queryName: "fetchUsers",
            inputs: [
                {
                    name: 'userInput',
                    isRequired: false,
                    model: UserInput.getSchemaName()
                }
            ],
            returnType: {
                type: "arr",
                model: UserSchema.getSchemaName(),
                isObjectRequired: false,
                isArrayRequired: true,
            }
        }
        const anotherQueryInput = {
            queryName: "fetchMetas",
            inputs: [
                {
                    name: 'metaAdd',
                    isRequired: true,
                    model: Meta.getSchemaName()
                },
            ],
            returnType: {
                model: Meta.getSchemaName(),
                isObjectRequired: true
            }
        }
        const expectedResult = `extend type Query {
            fetchUsers(userInput: UserInput!): [User]
        }`
        const NewQuery = new QueryMaker({
            queries: [queryInput, anotherQueryInput],
            isExtended: true,
            queryType: "Mutation"
        })
        log(expectedResult, 'warn')
        log(NewQuery.getBuiltSchema(), 'info')
    })
})