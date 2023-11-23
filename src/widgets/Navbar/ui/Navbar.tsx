import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLinks'

interface NavbarProps {
  className?: string
}
export const Navbar = ({ className = '' }: NavbarProps): JSX.Element => {
  return (
      <div className={classNames(cls.Navbar, {}, [className])}>
          <div className={cls.links}>
              <AppLink to={'/'} className={cls.mainLink} theme={AppLinkTheme.SECONDARY}>Main page</AppLink>
              <AppLink to={'/about'} theme={AppLinkTheme.SECONDARY}>About page</AppLink>
          </div>
      </div>
  )
}
