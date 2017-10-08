import {
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import createSchemaFromCompose from './compose-schema'

const packageInfo = require('../package.json')

const somedata = {
  firstName: 'John',
  lastName: 'BananaSeed'
}
const simpleSchema = makeExecutableSchema({
  typeDefs: `
    type Profile {
      firstName: String
      lastName: String
    }

    type Query {
      version: String
      profile: Profile
    }



    input ProfileInputType {
      firstName: String!
      lastName: String!
    }

    type UpdateProfileResultType  {
      record: Profile
    }
    type Mutation {
      updateProfile(record: ProfileInputType!): UpdateProfileResultType
    }
  `,
  resolvers: {
    Mutation: {
      updateProfile: (source, args) => {
        somedata.firstName = args.record.firstName
        somedata.lastName = args.record.lastName
        return {
          record: somedata
        }
      }
    },
    Query: {
      version: () => packageInfo.version,
      profile: () => somedata
    }
  }
})

export default function createGraphQLSchema(models: ApplicationModels) {
  const graphqlComposeSchema = createSchemaFromCompose(models)
  const schemas = [simpleSchema, graphqlComposeSchema ]
  return mergeSchemas({
    schemas,
    resolvers: (mergeInfo) => ({

    })
  })
}
