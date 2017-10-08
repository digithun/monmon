
import * as mongoose from 'mongoose'
declare global {
  interface DBConnectionContext {
    logger: ApplicationLogger
    config: ApplicationConfig
  }
}

export async function initConnection(context: DBConnectionContext ): Promise<mongoose.Connection> {
  return new Promise<mongoose.Connection>(async (resolve, reject) => {
    const __connection: any = mongoose.createConnection(context.config.MONGODB_URI, {
      promiseLibrary: global.Promise
    })

    __connection.on('disconnected', () => {
      context.logger.log(`👊🏽  Disconnected => ${context.config.MONGODB_URI}`)
    })

    __connection.on('reconnect', () => {
      context.logger.log(`😧  Reconnect to => ${context.config.MONGODB_URI}`)
    })

    __connection.on('connected', () => {
      context.logger.log(`🖥  Connected => ${context.config.MONGODB_URI} `)
      resolve(__connection)
    })
  })
}
