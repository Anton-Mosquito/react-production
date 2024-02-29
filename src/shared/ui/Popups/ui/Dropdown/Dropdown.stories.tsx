import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'
import { Button } from '../../../Button/Button'

const meta = {
  title: 'shared/Dropdown',
  component: Dropdown,
  tags: ['autodocs']
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    trigger: <Button/>,
    items: [
      { content: 'Content1' },
      { content: 'Content2' }
    ]
  }
}
