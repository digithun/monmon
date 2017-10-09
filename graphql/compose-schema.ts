
import { GQC, TypeComposer } from 'graphql-compose'
import * as mongoose from 'mongoose'
import thread from './Thread'
import comment from './Comment'
declare global {
  interface ApplicationModels {
    Thread: mongoose.Model<IThread>
    Comment: mongoose.Model<IComment>
  }
}
export default function createSchema(connection: mongoose.Connection): {
  schema: any
  models: ApplicationModels
} {
  const models = {
    Thread: connection.model<IThread>('Thread', thread.schema),
    Comment: connection.model<IComment>('Comment', comment.schema)
  }
  const typeComposers = {
    Thread: thread.createTypeComposer(models.Thread),
    Comment: comment.createTypeComposer(models.Comment)
  }

  GQC.rootQuery().addFields({
    threads: typeComposers.Thread.getResolver('findMany'),
    thread: typeComposers.Thread.getResolver('findAndUpdate')
  })
  GQC.rootMutation().addFields({
    createThread: typeComposers.Thread.getResolver('createOne'),
    updateCommentById: typeComposers.Comment.getResolver('updateById')
  })
  return {
    schema: GQC.buildSchema() ,
    models
  }
}
