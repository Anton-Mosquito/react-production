import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher'
import cls from './Sidebar.module.scss'
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLinks'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = (): void => { setCollapsed(prev => !prev) }
  const { t } = useTranslation()

  return (
      <div
          data-testid='sidebar'
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
      >
          <Button
              data-testid='sidebar-toggle'
              className={cls.collapseBtn}
              theme={ThemeButton.BACKGROUND_INVERTED}
              square
              size={ButtonSize.L}
              onClick={onToggle}
          >
              {collapsed ? '>' : '<'}
          </Button>
          <div className={cls.items}>
              <AppLink
                  to={RoutePath.main}
                  className={cls.item}
                  theme={AppLinkTheme.SECONDARY}
              >
                  <MainIcon className={cls.icon}/>
                  <span className={cls.link}>{t('Главная')}</span>
              </AppLink>
              <AppLink
                  to={RoutePath.about}
                  className={cls.item}
                  theme={AppLinkTheme.SECONDARY}
                  >
                  <AboutIcon className={cls.icon}/>
                  <span className={cls.link}>{t('О сайте')}</span>
              </AppLink>
          </div>
          <div className={cls.switchers}>
              <ThemeSwitcher/>
              <LangSwitcher
                  className={cls.lang}
                  short={collapsed}
              />
          </div>
      </div>
  )
}
