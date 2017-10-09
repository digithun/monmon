import {
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';

import createSchemaFromCompose from './compose-schema'

const packageInfo = require('../package.json')

// Define global Models
declare global {
  interface UserProfile {
    _id: string
    firstName: string
    lastName: string
  }
}
const profileData: UserProfile = {
  _id: 'mock/id',
  firstName: 'John',
  lastName: 'BananaSeed'
}
const simpleSchema = makeExecutableSchema({
  typeDefs: `
    type Profile {
      _id: String
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
      updateProfile: (source, args: { record: UserProfile }) => {
        profileData.firstName = args.record.firstName
        profileData.lastName = args.record.lastName
        return {
          record: profileData
        }
      }
    },
    Query: {
      version: () => packageInfo.version,
      profile: () => profileData
    }
  }
})
let __models
export function getModels(context: ApplicationContext) {
  if (__models) {
    return __models
  } else {
    // create model
  }
}
export function createGraphQLSchema(context: ApplicationContext) {

  const graphqlComposeSchema = createSchemaFromCompose(context.__connection)
  const schemas = [simpleSchema, graphqlComposeSchema.schema]
  __models = graphqlComposeSchema.models
  return {
    models: __models,
    schema: mergeSchemas({
      schemas,
      resolvers: (mergeInfo) => ({

      })
    })
  }
}
