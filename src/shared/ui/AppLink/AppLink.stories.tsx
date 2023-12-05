import type { Meta, StoryObj } from '@storybook/react'
import { AppLink, AppLinkTheme } from './AppLinks'

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  args: {
    to: '/'
  }
} satisfies Meta<typeof AppLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'AppLink'
  }
}

export const Secondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'AppLink'
  }
}

export const Red: Story = {
  args: {
    theme: AppLinkTheme.RED,
    children: 'AppLink'
  }
}
