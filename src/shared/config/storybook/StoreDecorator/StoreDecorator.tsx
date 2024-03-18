import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { type Decorator } from '@storybook/react'
// eslint-disable-next-line custom-path-checker/api-imports
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
import { type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '@/entities/Article'
// eslint-disable-next-line custom-path-checker/api-imports
import { addCommentFormReducer } from '@/features/addCommentForm/model/slice/addCommentForm'
// eslint-disable-next-line custom-path-checker/api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices'
// eslint-disable-next-line custom-path-checker/api-imports
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer
}
export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
): Decorator => (StoryComponent) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
)
