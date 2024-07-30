import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalArgs = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'name' },
    },
};

export const Normal: Story = {
    args: {
        ...normalArgs,
    },
};

export const NormalRedesigned: Story = {
    args: {
        ...normalArgs,
    },
    decorators: [FeaturesFlagsDecorator({ isAppRedesigned: true })],
};

export const LoadingComment: Story = {
    args: {
        comment: {
            id: '1',
            text: 'hello world',
            user: { id: '1', username: 'name' },
        },
        isLoading: true,
    },
};
