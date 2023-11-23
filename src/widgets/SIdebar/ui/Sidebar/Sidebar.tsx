import { classNames } from 'shared/lib/classNames/classNames'
import { useState } from 'react'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher'
import cls from './Sidebar.module.scss'
import { Button } from 'shared/ui/Button/Button'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = (): void => { setCollapsed(prev => !prev) }

  return (
      <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
          <Button onClick={onToggle}>Toogle</Button>
          <div className={cls.switchers}>
              <ThemeSwitcher/>
              <LangSwitcher className={cls.lang}/>
          </div>
      </div>
  )
}
