import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from './LoginForm'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'feature/LoginForm',
  component: LoginForm,
  tags: ['autodocs']
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const LoginForm1: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      loginForm: {
        isLoading: true
      }
    })
  ],
}

export const LoginFormWithError: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      loginForm: {
        isLoading: false,
        error: 'Custom error',
        username: '123',
        password: '123'
      }
    })
  ],
}
