import React, { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher'
import cls from './Sidebar.module.scss'
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button'
import { SidebarItemsList } from '../../model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
    className?: string
}

const Sidebar = memo(({ className = '' }: SidebarProps): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = (): void => { setCollapsed(prev => !prev) }

    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed])

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
              {itemsList}
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
})

Sidebar.displayName = 'Sidebar'

export { Sidebar }
