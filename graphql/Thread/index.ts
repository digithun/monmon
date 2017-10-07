import { Model } from 'mongoose'
import { TypeComposer } from 'graphql-compose'
import composeWithMongoose from 'graphql-compose-mongoose'

import enchanceCreate from './create.resolver'
export default (ThreadModel: Model<IThread>): TypeComposer  => {

  const typeComposer = composeWithMongoose(ThreadModel) as TypeComposer
  enchanceCreate(typeComposer)

  return typeComposer
}
