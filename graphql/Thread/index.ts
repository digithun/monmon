import { Model } from 'mongoose'
import { TypeComposer } from 'graphql-compose'
import composeWithMongoose from 'graphql-compose-mongoose'

import enchanceCreate from './create.resolver'
import schema from './thread.schema'

export default {
  schema,
  createTypeComposer: (ThreadModel): TypeComposer => {
    const typeComposer = composeWithMongoose(ThreadModel) as TypeComposer
    enchanceCreate(typeComposer)
    return typeComposer
  },
  createGraphQLRelation: (typeComposers) => {
    // implement Relation
  }
} as ApplicationGraphqlStrategy<IThread>
