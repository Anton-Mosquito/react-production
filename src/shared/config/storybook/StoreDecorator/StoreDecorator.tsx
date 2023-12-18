import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { type DeepPartial } from '@reduxjs/toolkit'
import { type Decorator } from '@storybook/react'

export const StoreDecorator = (state: DeepPartial<StateSchema>) =>
  (StoryComponent) => (
      <StoreProvider initialState={state}>
          <StoryComponent />
      </StoreProvider>
  )
