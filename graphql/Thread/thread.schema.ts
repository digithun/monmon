import * as mongoose from 'mongoose'
declare global {
  type GBThreadType = {
    appId: string
    contentId: mongoose.Types.ObjectId
    contentPrefix: string
  }
  interface ThreadDocument extends mongoose.Document, GBThreadType { }
}
const threadSchema = new mongoose.Schema({
  appId: {
    required: true,
    type: String
  },

  contentPrefix: {
    required: true,
    type: String
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
})

export default threadSchema
