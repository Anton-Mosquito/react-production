import {
  type ReducersMapObject,
  type EnhancedStore,
  type Action,
  type Reducer
} from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'
import { type ProfileSchema } from 'entities/Profile'
import { type UserSchema } from 'entities/User'
import { type LoginSchema } from 'features/AuthByUsername'
import { type NavigateOptions, type To } from 'react-router-dom'

export interface StateSchema {
  user: UserSchema
  // Asynchronous reducers
  loginForm?: LoginSchema
  profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: Action) => ReducersMapObject<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
}
