import {
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import createSchemaFromCompose from './compose-schema'

const packageInfo = require('../package.json')

const verionInfoSchema = makeExecutableSchema({
  typeDefs: `
    type Query {
      version: String
    }
  `,
  resolvers: {
    Query: {
      version: () => packageInfo.version
    }
  }
})

export default function createGraphQLSchema(models: ApplicationModels) {
  const graphqlComposeSchema = createSchemaFromCompose(models)
  const schemas = [verionInfoSchema, graphqlComposeSchema ]
  return mergeSchemas({
    schemas,
    resolvers: (mergeInfo) => ({

    })
  })
}
