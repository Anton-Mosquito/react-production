import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from './AppLink';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    tags: ['autodocs'],
    args: {
        to: '/',
    },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'AppLink',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'AppLink',
    },
};

export const Red: Story = {
    args: {
        variant: 'red',
        children: 'AppLink',
    },
};
