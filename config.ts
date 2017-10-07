require('dotenv').config({})
const chalk = require('chalk')

function requiredEnv(name: any) {
  if(process.env[name]) {
    return process.env[name]
  } else {
    throw new Error(`Environment variables not defined (${name})`)
  }
}
function optionalEnvWithDefault(name: any, defaultValue: any) {

  if(process.env[name]) {
    return process.env[name]
  } else {
    console.log(chalk.yellow(`${name} not defined use ${defaultValue}`))
    return defaultValue
  }
}
declare global {
  interface APPConfig {
    MONGODB_URI: string,
    PORT: string
  }
}
const config: APPConfig = {
  MONGODB_URI: requiredEnv('MONGODB_URI'),
  PORT: optionalEnvWithDefault('PORT', 3000)
}

export default config