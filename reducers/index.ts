import { Reducer } from 'redux'

declare global {

  interface GlobalState {
    loading?: boolean
  }
  interface ApplicationState {
    global: GlobalState
  }
}
const globalReducer: Reducer<GlobalState> = (state, action) => {

  switch (action.type) {
    case 'global/loading-start':
      return {
        ...state,
        loading: true
      }
    case 'global/loading-done':
      return {
        ...state,
        loading: false
      }
    default: {
      return {
        ...state
      }
    }
  }
}

export default {
  global: globalReducer
}
