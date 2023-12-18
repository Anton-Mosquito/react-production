import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonSize, ThemeButton } from './Button'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Button'
  },
  decorators: [ThemeDecorator]
}

export const Clear: Story = {
  args: {
    children: 'CLEAR',
    theme: ThemeButton.CLEAR
  },
  decorators: [ThemeDecorator]
}

export const ClearInverted: Story = {
  args: {
    children: 'ClearInverted',
    theme: ThemeButton.CLEAR_INVERTED
  },
  decorators: [ThemeDecorator]
}

export const Outline: Story = {
  args: {
    children: 'OUTLINE',
    theme: ThemeButton.OUTLINE
  },
  decorators: [ThemeDecorator]
}

export const OutlineSizeL: Story = {
  args: {
    children: 'OUTLINE',
    theme: ThemeButton.OUTLINE,
    size: ButtonSize.L
  },
  decorators: [ThemeDecorator]
}

export const OutlineSizeXL: Story = {
  args: {
    children: 'OUTLINE',
    theme: ThemeButton.OUTLINE,
    size: ButtonSize.XL
  },
  decorators: [ThemeDecorator]
}

export const Background: Story = {
  args: {
    children: 'Background',
    theme: ThemeButton.BACKGROUND
  },
  decorators: [ThemeDecorator]
}

export const BackgroundInverted: Story = {
  args: {
    children: 'BackgroundInverted',
    theme: ThemeButton.BACKGROUND_INVERTED
  },
  decorators: [ThemeDecorator]
}

export const Square: Story = {
  args: {
    children: '>',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.M
  },
  decorators: [ThemeDecorator]
}

export const SquareSizeL: Story = {
  args: {
    children: '>',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L
  },
  decorators: [ThemeDecorator]
}

export const SquareSizeXL: Story = {
  args: {
    children: '>',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL
  },
  decorators: [ThemeDecorator]
}

export const Disabled: Story = {
  args: {
    children: '>',
    theme: ThemeButton.OUTLINE,
    disabled: true
  },
  decorators: [ThemeDecorator]
}
