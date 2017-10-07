import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as chalk from 'chalk'
import { Connection } from 'mongoose'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import * as DBConnection from '../lib/db.connection'
import graphqlBuildedSchema from '../graphql'
declare global {
  interface ApplicationLogger {
    log: (message: string) => void
  }
  interface ApplicationContext {
    config: APPConfig
    logger: ApplicationLogger
  }
}

export default async function init(context: ApplicationContext){
  const server = express()
  server.use(bodyParser.json())
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  server.use('/graphql', graphqlExpress( (req) => ({
    schema: graphqlBuildedSchema({})
  })))
  
  let __connection: Connection
      __connection = await DBConnection.initConnection(context)
  return {
    start: async function() {
      server.listen(context.config.PORT, function() {
        context.logger.log(chalk.bgGreen(`Start application !!`))
        context.logger.log(chalk.green(`Application start on port =>> ${context.config.PORT}`))
      })
    },
    close: async function() {
     __connection.close()
     process.exit(0)
    }
  }
}