import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import {
  renderWithTranslations
} from 'shared/lib/tests/renderWithTranslations/renderWithTranslations'

describe('Sidebar', () => {
  test('with only first params', () => {
    renderWithTranslations(<Sidebar/>)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('with only first params', () => {
    renderWithTranslations(<Sidebar/>)
    const toggleButton = screen.getByTestId('sidebar-toggle')
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
