const chalk = require('chalk')

export function requiredEnv(name: any) {
  if (process.env[name]) {
    return process.env[name]
  } else {
    throw new Error(`Environment variables not defined (${name})`)
  }
}
export function optionalEnvWithDefault(name: any, defaultValue: any) {

  if (process.env[name]) {
    return process.env[name]
  } else {
    console.log(chalk.yellow(`${name} not defined use ${defaultValue}`))
    return defaultValue
  }
}
