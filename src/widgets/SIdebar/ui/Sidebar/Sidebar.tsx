import React, { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from '../../../ThemeSwitcher'
import { LangSwitcher } from '../../../LangSwitcher'
import cls from './Sidebar.module.scss'
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { VStack } from 'shared/ui/Stack/VStack/VStack'

interface SidebarProps {
  className?: string
}

const Sidebar = memo(({ className }: SidebarProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemsList = useSelector(getSidebarItems)
  const onToggle = (): void => { setCollapsed(prev => !prev) }

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
      <SidebarItem
          key={item.path}
          item={item}
          collapsed={collapsed}
      />
  )), [collapsed, sidebarItemsList])

  return (
      <menu
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
          <VStack className={cls.items} gap='8'>
              {itemsList}
          </VStack>
          <div className={cls.switchers}>
              <ThemeSwitcher/>
              <LangSwitcher
                  className={cls.lang}
                  short={collapsed}
              />
          </div>
      </menu>
  )
})

Sidebar.displayName = 'Sidebar'

export { Sidebar }
