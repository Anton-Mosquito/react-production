import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta = {
    title: 'shared/Popover',
    component: Popover,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        trigger: '<div></div>',
    },
};
