import type { Meta, StoryObj } from '@storybook/react'
import { EditableProfileCard } from './EditableProfileCard'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'feature/EditableProfileCard',
  component: EditableProfileCard,
  tags: ['autodocs']
} satisfies Meta<typeof EditableProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({})
  ]
}
