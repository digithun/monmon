import * as mongoose from 'mongoose'
declare global {

  type GBReactionType = {
    actionType: | 'smile' | 'laugh' | 'sad'
    userId: mongoose.Types.ObjectId
  }
  type GBCommentType = {
    threadId: mongoose.Types.ObjectId
    GBCommentType: string
    message: string
    reactions: GBReactionType[]
    reply: mongoose.Types.ObjectId[]
    _id: any
  }
  interface CommentDocument extends mongoose.Document, GBCommentType {
  }
}
const commentSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
  GBCommentType: {
    type: String,
    enum: ['TEXT'],
  },
  reactions: {
    default: [],
    type: {
      userId: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      actionType: {
        type: String,
        enum: ['smile', 'laugh', 'sad'],
        require: true
      }
    }
  },
  message: {
    type: String,
    required: [true, 'comment, require message'],
    validate: {
      validator: (value) => {
        return value.length <= 300 && value.length > 0
      },
      msg: 'comment, should less than 300 length and more than 0'
    }
  },
  reply: [{
    type: mongoose.Schema.Types.ObjectId
  }]
})

export default commentSchema
