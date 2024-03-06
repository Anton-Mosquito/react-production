import type { Preview } from '@storybook/react'
import { Theme } from '@/app/providers/ThemeProvider'
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator'
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator/StyleDecorator'
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    SuspenseDecorator
  ]
}

export default preview
