import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { type Decorator } from '@storybook/react'
import { type ReducersMapObject } from '@reduxjs/toolkit'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultAsyncReducers: Partial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer
}
export const StoreDecorator = (
  state: Partial<StateSchema>,
  asyncReducers?: Partial<ReducersMapObject<StateSchema>>
) => (StoryComponent) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
)
