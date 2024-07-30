import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'lastname',
    first: 'first',
    city: 'city',
    currency: Currency.USD,
};

export const Primary: Story = {
    args: {
        data: { ...args },
    },
};

export const PrimaryRedesigned: Story = {
    args: {
        data: { ...args },
    },
    decorators: [FeaturesFlagsDecorator({ isAppRedesigned: true })],
};

export const WithError: Story = {
    args: {
        error: 'true',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};
