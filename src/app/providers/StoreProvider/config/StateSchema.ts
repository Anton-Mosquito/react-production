import {
  type ReducersMapObject,
  type EnhancedStore,
  type Action,
  type Reducer
} from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'
import { type ArticleDetailsSchema } from 'entities/Article'
import { type ProfileSchema } from 'entities/Profile'
import { type UserSchema } from 'entities/User'
import { type LoginSchema } from 'features/AuthByUsername'
import { type UISchema } from 'features/UI'
import { type AddCommentFormSchema } from 'features/addCommentForm'
import { type ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage'
import { type ArticlesPagesSchema } from 'pages/ArticlesPage'

export interface StateSchema {
  user: UserSchema
  ui: UISchema

  // Asynchronous reducers
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPagesSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: Action) => ReducersMapObject<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  // true - mounted, false - unmounted
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
