import * as mongoose from 'mongoose'
import threadSchema from './thread.schema'
import commentSchema from './comment.schema'
declare global {
  interface ApplicationModels {
    Thread: mongoose.Model<IThread>
    Comment: mongoose.Model<IComment>
  }
}
export function createModelsFromMongooseConnection(connection: mongoose.Connection): ApplicationModels {

  return {
    Thread: connection.model<IThread>('Thread', threadSchema),
    Comment: connection.model<IComment>('Comment', commentSchema)
  }
}
