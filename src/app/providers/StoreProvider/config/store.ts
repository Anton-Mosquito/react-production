import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type ThunkExtraArg, type StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'

export function createReduxStore (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    reducer: reducerManager.reduce as ReducersMapObject<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg
      }
    })
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.reducerManager = reducerManager

  return store
}

// export type RootState = ReturnType<typeof createReduxStore.getState>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
