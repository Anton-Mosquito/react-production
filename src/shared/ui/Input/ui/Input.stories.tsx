import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs']
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const CustomInput: Story = {
  args: {
    placeholder: 'Type text',
    value: '123123'
  }
}
