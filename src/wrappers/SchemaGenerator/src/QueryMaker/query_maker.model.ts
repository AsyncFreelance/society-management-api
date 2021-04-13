import { IQueryMakerInit, IQueryMaker, ReturnTypes, SingleQuery, QueryTypes } from "./query_maker.types"

export default class QueryMaker implements IQueryMaker {
  queries: SingleQuery[];
  isExtended: boolean = true
  queryType: QueryTypes = QueryTypes.QUERY

  constructor(queryInput: IQueryMakerInit) {
    this.queries = queryInput.queries
    if (queryInput.isExtended) {
      this.isExtended = Boolean(queryInput.isExtended)
    }
    queryInput.queryType? this.queryType = queryInput.queryType : null
  }

  getBuiltSingleSchema = (singleQuery: SingleQuery): string => {
    let totalSchema = `\t${singleQuery.queryName}(`

    singleQuery.inputs.forEach(input => {
      totalSchema += input.name + ": " + input.model.getSchemaName() + (input.isRequired ? "!" : "") + ", "
    })

    totalSchema = totalSchema.slice(0, totalSchema.length - 2)
    totalSchema += ")"

    if (singleQuery.returnType.type === ReturnTypes.ARRAY) {
      totalSchema += ": ["
      singleQuery.returnType.isObjectRequired ?
        totalSchema += singleQuery.returnType.model.getSchemaName() + "!" :
        totalSchema += singleQuery.returnType.model.getSchemaName()
      totalSchema += "]"
      singleQuery.returnType.isArrayRequired ?
      totalSchema += "!" : null
    } else {
      totalSchema += ": "
      totalSchema += singleQuery.returnType.isObjectRequired ?
        singleQuery.returnType.model.getSchemaName() + "!" :
        singleQuery.returnType.model.getSchemaName()
    }

    return totalSchema
  }

  getBuiltSchema = (): string => {
    let totalSchema: string = (this.isExtended ? 'extend ' : '') + `type ${this.queryType} {\n`
    this.queries.forEach(query => {
      totalSchema += this.getBuiltSingleSchema(query) + "\n"
    })
    totalSchema += "\n}"
    return totalSchema
  }
}