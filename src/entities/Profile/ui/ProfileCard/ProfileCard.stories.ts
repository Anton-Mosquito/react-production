import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs']
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    data: {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'lastname',
      first: 'first',
      city: 'city',
      currency: Currency.USD
    }
  }
}

export const WithError: Story = {
  args: {
    error: 'true'
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}
