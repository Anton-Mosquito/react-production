import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        value: 'Content1',
        items: [
            { content: 'Content1', value: 'Content1' },
            { content: 'Content2', value: 'Content2' },
        ],
    },
};

export const TopLeft: Story = {
    args: {
        direction: 'top left',
        value: 'Content1',
        items: [
            { content: 'Content1', value: 'Content1' },
            { content: 'Content2', value: 'Content2' },
        ],
    },
};

export const TopRight: Story = {
    args: {
        direction: 'top right',
        value: 'Content1',
        items: [
            { content: 'Content1', value: 'Content1' },
            { content: 'Content2', value: 'Content2' },
        ],
    },
};

export const BottomLeft: Story = {
    args: {
        direction: 'bottom left',
        value: 'Content1',
        items: [
            { content: 'Content1', value: 'Content1' },
            { content: 'Content2', value: 'Content2' },
        ],
    },
};

export const BottomRight: Story = {
    args: {
        direction: 'bottom right',
        value: 'Content1',
        items: [
            { content: 'Content1', value: 'Content1' },
            { content: 'Content2', value: 'Content2' },
        ],
    },
};
