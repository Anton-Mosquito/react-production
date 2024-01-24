import {
  type ReducersMapObject,
  combineReducers,
  type Action,
  type Reducer
} from '@reduxjs/toolkit'
import { type StateSchemaKey, type StateSchema, type ReducerManager } from './StateSchema'

export function createReducerManager
(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  const reducers = { ...initialReducers }

  let combinedReducer = combineReducers(reducers)
  let keysToRemove: StateSchemaKey[] = []

  return {
    getReducerMap: () => reducers,
    // @ts-expect-error
    reduce: (state: StateSchema, action: Action) => {
      if (keysToRemove.length > 0) {
        state = { ...state }
        keysToRemove.forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete state[key]
        })
        keysToRemove = []
      }

      // @ts-expect-error
      return combinedReducer(state, action)
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }

      reducers[key] = reducer
      combinedReducer = combineReducers(reducers)
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete reducers[key]
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers)
    }
  }
}
