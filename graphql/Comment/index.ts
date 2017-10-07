import { Model } from 'mongoose'
import { TypeComposer } from 'graphql-compose'
import composeWithMongoose from 'graphql-compose-mongoose'

export default (CommentModel: Model<IComment>): TypeComposer  => {

  const typeComposer = composeWithMongoose(CommentModel) as TypeComposer

  return typeComposer
}
