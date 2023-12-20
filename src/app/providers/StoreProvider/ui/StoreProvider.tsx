import { type ReactNode } from 'react'
import { createReduxStore } from '../config/store'
import { Provider } from 'react-redux'
import { type StateSchema } from '../config/StateSchema'
import { type ReducersMapObject } from '@reduxjs/toolkit'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: Partial<StateSchema>
  asyncReducers?: Partial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = ({
  children,
  initialState,
  asyncReducers
}: StoreProviderProps): JSX.Element => {
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>
  )

  return (
      <Provider store={store}>
          {children}
      </Provider>
  )
}
