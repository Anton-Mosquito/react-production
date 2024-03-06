import type { Meta, StoryObj } from '@storybook/react'
import { EditProfileCardHeader } from './EditProfileCardHeader'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'feature/EditProfileCardHeader',
  component: EditProfileCardHeader,
  tags: ['autodocs']
} satisfies Meta<typeof EditProfileCardHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({})
  ]
}
