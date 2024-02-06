import type { Meta, StoryObj } from '@storybook/react'
import { ArticleViewSelector } from './ArticleViewSelector'

const meta = {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  tags: ['autodocs']
} satisfies Meta<typeof ArticleViewSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  }
}
