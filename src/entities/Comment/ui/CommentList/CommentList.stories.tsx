import type { Meta, StoryObj } from '@storybook/react'
import { CommentList } from './CommentList'

const meta = {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  tags: ['autodocs']
} satisfies Meta<typeof CommentList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    comments: [
      {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'name' }
      },
      {
        id: '2',
        text: 'hello world',
        user: { id: '2', username: 'name1' }
      }
    ]
  }
}

export const Loading: Story = {
  args: {
    comments: [],
    isLoading: true
  }
}
