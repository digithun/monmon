
import { GQC, TypeComposer } from 'graphql-compose'
import composeThreadModel from './Thread'
import composeCommentModel from './Comment'

export default function createSchema(models: ApplicationModels) {

  const typeComposers = {
    Thread: composeThreadModel(models.Thread),
    Comment: composeCommentModel(models.Comment)
  }

  GQC.rootQuery().addFields({
    threads: typeComposers.Thread.getResolver('findMany'),
    thread: typeComposers.Thread.getResolver('findAndUpdate')
  })
  GQC.rootMutation().addFields({
    createThread: typeComposers.Thread.getResolver('createOne'),
    updateCommentById: typeComposers.Comment.getResolver('updateById')
  })
  return GQC.buildSchema()
}
