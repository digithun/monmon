import config from './config'
import initApp from './server/index'
import { Connection, Model } from 'mongoose'
import * as Models from './models'
import * as chalk from 'chalk'
import * as DBConnection from './lib/db.connection'

const logger = {
  log: (message) => {
    console.log(message)
  }
}
async function run() {

  const __connection: Connection = await DBConnection.initConnection({
    logger,
    config
  })
  const models = await Models.createModelsFromMongooseConnection(__connection)
  const applicationContext: ApplicationContext = {
    config,
    logger,
    models
  }
  const app = await initApp(applicationContext)

  async function clearConnection() {
    logger.log(chalk.green('closing app...'))
    await __connection.close()
    process.exit(0)
  }
  process.on('SIGTERM', clearConnection)
  process.on('SIGINT', clearConnection)

  app.start()
}

run()
