import { Model } from 'mongoose'
import { TypeComposer } from 'graphql-compose'
import composeWithMongoose from 'graphql-compose-mongoose'
import schema from './comment.schema'

export default {
  schema,
  createTypeComposer: (CommentModel): TypeComposer => {
    const typeComposer = composeWithMongoose(CommentModel) as TypeComposer
    return typeComposer
  }
} as ApplicationGraphqlStrategy<IComment>
