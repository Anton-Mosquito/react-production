import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';


const App = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle</button>
      <Link to={'/'}>Main page</Link>
      <Link to={'/about'}>About page</Link>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
            <Route path={'/about'} element={<AboutPage />}/>
            <Route path={'/'} element={<MainPage />}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;