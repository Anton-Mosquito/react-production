import type { Meta, StoryObj } from '@storybook/react';
import AdminPanelPage from './AdminPanelPage';

const meta = {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
    tags: ['autodocs'],
} satisfies Meta<typeof AdminPanelPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};
