import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { Suspense } from 'react';
import './styles/index.scss';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/className/classNames';


const App = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle</button>
      <Link to={'/'}>Main page</Link>
      <Link to={'/about'}>About page</Link>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
            <Route path={'/about'} element={<AboutPageAsync />}/>
            <Route path={'/'} element={<MainPageAsync />}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;