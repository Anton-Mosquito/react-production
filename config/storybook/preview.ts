import type { Preview } from '@storybook/react'
import { RouterDecorator } from 'shared/config/storybook/RouterDecorator/RouterDecorator'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

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
    //ThemeDecorator,
    RouterDecorator,
    //StoreDecorator
  ]
}

export default preview
