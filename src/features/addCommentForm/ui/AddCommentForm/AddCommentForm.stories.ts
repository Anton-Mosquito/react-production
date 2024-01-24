import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AddCommentForm from './AddCommentForm'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  tags: ['autodocs']
} satisfies Meta<typeof AddCommentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    onSendComment: action('onSendComment')
  },
  decorators: [StoreDecorator({})]
}
