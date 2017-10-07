import config from './config'
import initApp from './server/index'

const logger = {
  log: (message) => {
    console.log(message)
  }
}
async function run() {

  const app = await initApp({
    config,
    logger
  })

  process.on('SIGTERM', app.close)
  process.on('SIGINT', app.close)

  app.start()
}


run()