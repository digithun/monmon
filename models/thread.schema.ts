import * as mongoose from 'mongoose'
declare global {
  type ReactionType = {
    actionType: | 'smile' | 'laugh' | 'sad'
    userId: mongoose.Types.ObjectId
  }
  type ThreadType = {
    appId: string
    contentId: mongoose.Types.ObjectId
    contentPrefix: string
    reactions: ReactionType[]
  }
  interface IThread extends mongoose.Document, ThreadType { }
}
const threadSchema = new mongoose.Schema({
  appId: {
    required: true,
    type: String
  },
  reactions: {
    default: [],
    type: new mongoose.Schema({
      userId: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      actionType: {
        type: String,
        enum: ['smile', 'laugh', 'sad'],
        require: true
      }
    })
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
