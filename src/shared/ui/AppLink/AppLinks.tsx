import React, { type ReactNode, type FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'
import { Link, type LinkProps } from 'react-router-dom'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red'
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
  children?: ReactNode
}

const AppLink = memo((
  {
    to,
    className = '',
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  }: AppLinkProps) => {
  return (
      <Link
          to={to}
          className={classNames(cls.AppLink, {}, [className, cls[theme]])}
          {...otherProps}
    >
          { children }
      </Link>
  )
})

AppLink.displayName = 'AppLink'

export { AppLink }
