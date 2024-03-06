import { type ReactNode, memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'
import { Card, CardTheme } from '../Card/Card'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

const Tabs = memo(({ className, tabs, value, onTabClick }: TabsProps): JSX.Element => {
  const clickHandle = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab)
    }
  }, [onTabClick])
  return (
      <div className={classNames(cls.Tabs, {}, [className])}>
          {tabs.map(tab => (
              <Card
                  className={cls.tab}
                  key={tab.value}
                  theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                  onClick={clickHandle(tab)}
              >
                  {tab.content}
              </Card>
          ))}
      </div>
  )
})

Tabs.displayName = 'Tabs'

export { Tabs }
