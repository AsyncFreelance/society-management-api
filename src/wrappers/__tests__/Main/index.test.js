const SchemaModel = require("../../dist/SingleSchema/single_schema.model").default
const QueryMaker = require("../../dist/QueryMaker/query_maker.model").default
const GraphQLMerger = require("../../dist/GraphQLMerger/graphql_merger.model").default

describe('Name of the group', () => {
  test('should ', () => {
    const UserModel = new SchemaModel({
      props: {
        name: 'String',
        age: 'Int!'
      },
      name: 'User'
    }, "type")
    const UserInput = new SchemaModel({
      props: {
        name: 'String!',
        age: 'Int!'
      },
      name: 'UserInput'
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
        model: UserModel.getSchemaName(),
        isObjectRequired: false,
        isArrayRequired: true,
      }
    }
    const QueryModel = new QueryMaker({
      queries: [queryInput]
    })

    const Merger = new GraphQLMerger()
    Merger.attachSchema(QueryModel.getBuiltSchema())
    Merger.attachSchema(UserModel.getBuiltSchema())
    Merger.attachSchema(UserInput.getBuiltSchema())
    Merger.getTypeDefs().forEach(def => {
        console.log(def)
    })
    // console.log(UserModel.getBuiltSchema())

    expect(1).toBe(1)
  });
});