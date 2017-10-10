import * as React from 'react'
import Form from '../components/Form.container'
import styled from 'styled-components'
// import withReduxApollo from '../lib/with-redux-apollo'

// export default withReduxApollo(Form)

const Input = styled.input([`
  width: 100px;
`])

export default () => {

  console.log('render')
  return (
    <Input />
  )
}
