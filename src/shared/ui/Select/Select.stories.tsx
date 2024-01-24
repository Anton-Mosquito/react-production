import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta = {
  title: 'ui/Select',
  component: Select,
  tags: ['autodocs']
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultText: Story = {
  args: {
    label: 'Set value',
    options: [
      { value: '1', content: 'First point' },
      { value: '2', content: 'Second point' },
      { value: '3', content: 'Third point' }
    ]
  }
}
