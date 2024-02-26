import { type ReactNode, useMemo, useState } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from '../lib/ThemeContext'

const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
const defaultTheme: Theme = (storedTheme ?? Theme.LIGHT) as Theme

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme)
  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  return (
      <ThemeContext.Provider value={defaultProps}>
          { children }
      </ThemeContext.Provider>
  )
}

export default ThemeProvider
