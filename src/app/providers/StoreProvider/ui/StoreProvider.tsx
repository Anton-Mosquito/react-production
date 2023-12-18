import { type ReactNode } from 'react'
import { createReduxStore } from '../config/store'
import { Provider } from 'react-redux'
import { type StateSchema } from '../config/StateSchema'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: StateSchema
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps): JSX.Element => {
  const store = createReduxStore(initialState)

  return (
      <Provider store={store}>
          {children}
      </Provider>
  )
}
