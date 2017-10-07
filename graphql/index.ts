import { GQC } from 'graphql-compose'
import {
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';

GQC.rootQuery().addFields({
  gqlCompose: {
    type: 'String',
    resolve: () => 'Hi from gqlCompose'
  }
})

const extraSchema = makeExecutableSchema({
  typeDefs: `
    type Query {
      gqlTools: String
    }
  `,
  resolvers: {
    Query: {
      gqlTools: () => 'Hi from gqlTools'
    }
  }
})
const schemas = [(extraSchema as any), (GQC.buildSchema() as any)]
export default function createGraphQLSchema(models: { [modelName: string]: any}) {
  return mergeSchemas({
    schemas,
    resolvers: mergeInfo => ({

    })
  })
}