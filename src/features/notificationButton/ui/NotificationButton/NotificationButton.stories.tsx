import type { Meta, StoryObj } from '@storybook/react'
import { NotificationButton } from './NotificationButton'

const meta = {
  title: 'feature/notificationButton/NotificationButton',
  component: NotificationButton,
  tags: ['autodocs']
} satisfies Meta<typeof NotificationButton>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  }
}
