import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense } from 'react'
import { useTheme } from 'app/providers/ThemeProvider'

const App = (): JSX.Element => {
  const { theme } = useTheme()
  return (
      <div className={classNames('app', {}, [theme])}>
          <Suspense fallback="">
              <Navbar />
              <div className='content-page'>
                  <Sidebar />
                  <AppRouter />
              </div>
          </Suspense>
      </div>
  )
}

export default App
