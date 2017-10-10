import * as mongoose from 'mongoose'

declare global {
  interface UserType {
    name: string
    thumbnailImageURL: string
    _id: any
  }
}
