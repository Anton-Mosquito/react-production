import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
    title: 'ui/Modal',
    component: Modal,
    tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        children: 'Modal',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Modal',
    },
};
