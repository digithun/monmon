import * as mongoose from 'mongoose'
declare global {
  interface IThread extends mongoose.Document {
    appId: string
    contentId: mongoose.Types.ObjectId
    contentPrefix: string
  }
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
