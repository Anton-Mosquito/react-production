import { classNames } from '@/shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/SIdebar'
import { Suspense, useEffect } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInited, userActions } from '@/entities/User'

const App = (): JSX.Element => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
      <div className={classNames('app', {}, [theme])}>
          <Suspense fallback="">
              <Navbar />
              <div className='content-page'>
                  <Sidebar />
                  {inited && <AppRouter />}
              </div>
          </Suspense>
      </div>
  )
}

export default App
