import type { Meta, StoryObj } from '@storybook/react'
import { CountrySelect } from './CountrySelect'


const meta = {
  title: 'entities/Country/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs']
} satisfies Meta<typeof CountrySelect>

export default meta
type Story = StoryObj<typeof meta>

export const countrySelect: Story = {
  args: {},
}
