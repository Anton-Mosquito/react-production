import { type Decorator } from '@storybook/react'
import { type Theme, ThemeProvider } from '@/app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme): Decorator => (StoryComponent) => {
  return (
      <ThemeProvider initialTheme={theme}>
          <div className={`app ${theme}`}>
              <StoryComponent/>
          </div>
      </ThemeProvider>
  )
}
