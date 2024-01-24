import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CommentCard } from './CommentCard'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  tags: ['autodocs']
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    comment: {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'name' }
    }
  }
}

export const LoadingComment: Story = {
  args: {
    comment: {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'name' }
    },
    isLoading: true
  }
}
