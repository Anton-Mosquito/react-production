import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextTheme } from './Text'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta = {
  title: 'ui/Text',
  component: Text,
  tags: ['autodocs']
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultText: Story = {
  args: {
    className: '',
    title: 'TITLE',
    text: 'TEXT'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const OnlyTitle: Story = {
  args: {
    className: '',
    title: 'ONLY TITLE'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const OnlyText: Story = {
  args: {
    className: '',
    text: 'ONLY TEXT'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const Error: Story = {
  args: {
    className: 'error',
    title: 'error TITLE',
    text: 'error TEXT',
    theme: TextTheme.ERROR
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}
