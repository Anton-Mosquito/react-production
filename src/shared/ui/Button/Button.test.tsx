import { Button } from './Button'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  test('with only first params', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })

  test('with additional class', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toHaveClass('clear')
  })
})
