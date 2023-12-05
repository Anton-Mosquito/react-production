import React from 'react'
import { type Decorator } from '@storybook/react'

export const ThemeDecorator: Decorator = (StoryComponent) => {
  return (
      <div className={'app dark'}>
          <StoryComponent/>
      </div>
  )
}
