import type { Meta, StoryObj } from '@storybook/react'
import { ArticleDetailsComments } from './ArticleDetailsComments'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'feature/ArticleDetailsComments',
  component: ArticleDetailsComments,
  tags: ['autodocs']
} satisfies Meta<typeof ArticleDetailsComments>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    id: '1'
  },
  decorators: [
    StoreDecorator({})
  ]
}
