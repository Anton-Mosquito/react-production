import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const img = 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'

const meta = {
  title: 'shared/Avatar',
  component: Avatar,
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Big: Story = {
  args: {
    size: 150,
    src: img
  }
}

export const Small: Story = {
  args: {
    size: 50,
    src: img
  }
}
