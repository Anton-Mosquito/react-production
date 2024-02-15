import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'

const meta = {
  title: 'ui/Flex',
  component: Flex,
  tags: ['autodocs']
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    direction: 'column',
    children: (
        <>
            <div>
                Children elements 1
            </div>
            <div>
                Children elements 2
            </div>
            <div>
                Children elements 3
            </div>
        </>
    )
  }
}

export const RowGap4: Story = {
  args: {
    gap: '4',
    direction: 'row',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    )
  }
}

export const RowGap8: Story = {
  args: {
    gap: '8',
    direction: 'row',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    )
  }
}

export const RowGap16: Story = {
  args: {
    gap: '16',
    direction: 'row',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    )
  }
}

export const Column: Story = {
  args: {
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    )
  }
}

export const ColumnGap16: Story = {
  args: {
    gap: '16',
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    )
  }
}

export const ColumnAlignEnd: Story = {
  args: {
    direction: 'column',
    align: 'end',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    )
  }
}
