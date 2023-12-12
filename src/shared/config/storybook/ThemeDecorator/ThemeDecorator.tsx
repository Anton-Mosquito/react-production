import React from 'react'
import { type Decorator } from '@storybook/react'
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider'

export const ThemeDecorator: Decorator = (StoryComponent) => {
  return (
      <ThemeProvider initialTheme={Theme.LIGHT}>
          <div className={`app ${Theme.LIGHT}`}>
              <StoryComponent/>
          </div>
      </ThemeProvider>
  )
}
