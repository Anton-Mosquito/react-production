import type { Meta, StoryObj } from '@storybook/react'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'feature/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  tags: ['autodocs']
} satisfies Meta<typeof ArticleDetailsPageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {},
  decorators: [
    StoreDecorator({})
  ]
}
