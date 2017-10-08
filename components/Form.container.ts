
import { graphql, compose } from 'react-apollo'
import FormComponent from './Form.component'

import gql from 'graphql-tag';

const Query = gql(`
  query {
    version
  }
`)

export default compose(
  graphql<{ version: string } , {}>(Query, {
   props: ({ data }) => ({ value: data.version || '' })
 })
)(FormComponent)
