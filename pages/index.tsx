import * as React from 'react'
import Tree from '../components/Tree'
import Form from '../components/Form.container'
import styledComponent from 'styled-components'
const styled = styledComponent

const Input = styled.input`
  width: 100px;
`

export default () => {

  console.log('render')
  return (
    < Tree />
  )
}

// const styled = require('styled-components').default
