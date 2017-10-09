import * as mongoose from 'mongoose'
declare global {
  type ThreadType = {
    appId: string
    contentId: mongoose.Types.ObjectId
    contentPrefix: string
  }
  interface IThread extends mongoose.Document, ThreadType { }
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
