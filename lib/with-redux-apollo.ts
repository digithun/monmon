import * as React from 'react'
import ApolloClient from 'apollo-client'
import Link from 'apollo-link-http'
import Cache from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
const hoistNonReactStatic = require('hoist-non-react-statics')
import passthrough from 'react-passthrough'

import initStore from './store.factory'

export default function withReduxApollo(WrappedComponent: React.ComponentClass) {

  class ConnectWithReduxAndApollo extends React.Component<{ client: ApolloClient<Cache>}, {}> {
    private client: ApolloClient<Cache>
    constructor(props) {
      super(props)
    }
    public static getInitialProps(ctx) {
      let config: ApplicationConfig;
      if (typeof window === 'undefined') {
        config = require('../config')
      } else {
        config = (window as any).config
      }
      return {
        config
      }
    }

    public render() {
      const cache =  new Cache().restore({})
      const link: any = new Link({ uri: '/graphql' })
      let client;
      if (typeof window !== 'undefined') {
        const globalWindow: any = window
        if (!(window as any).client) {
          globalWindow.client = new ApolloClient({ link, cache });
          globalWindow.store = initStore({
            apolloClient: globalWindow.client,
            initialState: {
              global: {
                loading: true
              }
            },
          })
        }
        client = (window as any).client
      } else {
        client = new ApolloClient({ link, cache })
      }
      const enhanceElement = React.createElement<any, any, any>(WrappedComponent, { })
      return React.createElement(ApolloProvider, {
        client
      }, enhanceElement)
    }
  }

  return hoistNonReactStatic(ConnectWithReduxAndApollo, WrappedComponent)
}
