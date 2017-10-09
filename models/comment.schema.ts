import * as mongoose from 'mongoose'
declare global {
  type CommentType = {
    threadId: mongoose.Types.ObjectId
    commentType: string
    message: string
    reply: mongoose.Types.ObjectId[]
  }
  interface IComment extends mongoose.Document, CommentType {
  }
}
const commentSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
  commentType: {
    type: String,
    enum: ['TEXT'],
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
