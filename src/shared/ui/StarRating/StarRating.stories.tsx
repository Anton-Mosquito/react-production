import type { Meta, StoryObj } from '@storybook/react'
import { StarRating } from './StarRating'

const meta = {
  title: 'ui/StarRating',
  component: StarRating,
  tags: ['autodocs']
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  }
}
