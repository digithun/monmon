import * as mongoose from 'mongoose'

declare global {
  interface GBUserType {
    name: string
    thumbnailImageURL: string
    _id: any
  }
}
