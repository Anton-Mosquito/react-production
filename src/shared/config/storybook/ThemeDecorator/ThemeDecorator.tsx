// eslint-disable-next-line custom-path-checker/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { type Theme } from '@/shared/const/theme'
import { type Decorator } from '@storybook/react'

export const ThemeDecorator = (theme: Theme): Decorator => (StoryComponent) => {
  return (
      <ThemeProvider initialTheme={theme}>
          <div className={`app ${theme}`}>
              <StoryComponent/>
          </div>
      </ThemeProvider>
  )
}
