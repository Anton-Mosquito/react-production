import type { Meta, StoryObj } from '@storybook/react'
import { PageError } from './PageError'

const meta = {
  title: 'widget/PageError',
  component: PageError,
  tags: ['autodocs']
} satisfies Meta<typeof PageError>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
  }
}

export const Dark: Story = {
  args: {
  }
}
