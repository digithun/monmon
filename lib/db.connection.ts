
import * as mongoose from 'mongoose'

// mongoose.Promise = global.Promise
export async function initConnection(context: ApplicationContext): Promise<mongoose.Connection> {
  return new Promise<mongoose.Connection>(async (resolve, reject) => {
    const connection = mongoose.createConnection(context.config.MONGODB_URI, {
      // useMongoClient: true,
      promiseLibrary: global.Promise
    })
    connection.on('disconnected', function() {
      context.logger.log(`👊🏽  Disconnecte => ${context.config.MONGODB_URI}`)
    })
    connection.on('connected', function () {
      context.logger.log(`🖥  Connected => ${context.config.MONGODB_URI} `)
      resolve(connection)
    })
  })
}