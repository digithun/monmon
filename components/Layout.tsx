import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'

export default class Layout extends React.Component<{}, {}> {

  public render() {
    return (
      <ThemeProvider theme={theme} >
        {this.props.children}
      </ThemeProvider>
    )
  }
}
