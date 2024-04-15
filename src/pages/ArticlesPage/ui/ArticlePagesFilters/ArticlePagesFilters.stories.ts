import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePagesFilters } from './ArticlePagesFilters';

const meta = {
    title: 'pages/Article/ArticlePagesFilters',
    component: ArticlePagesFilters,
    tags: ['autodocs'],
} satisfies Meta<typeof ArticlePagesFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};
