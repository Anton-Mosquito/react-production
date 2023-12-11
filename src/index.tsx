import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import 'shared/config/i18n/i18n'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'

const container = document.getElementById('root')

if (container !== null) {
  const root = createRoot(container) // createRoot(container!) if you use TypeScript

  root.render(
      <StoreProvider initialState={{}}>
          <BrowserRouter>
              <ErrorBoundary>
                  <ThemeProvider>
                      <App/>
                  </ThemeProvider>
              </ErrorBoundary>
          </BrowserRouter>
      </StoreProvider>
  )
}
