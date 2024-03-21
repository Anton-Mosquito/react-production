import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { Theme } from '@/shared/const/theme'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

interface ThemeSwitcherProps {
  className?: string
}

const ThemeSwitcher = memo((
  { className = '' }: ThemeSwitcherProps
): JSX.Element => {
  const { theme, toggleTheme } = useTheme()

  return (
      <Button
          theme={ThemeButton.CLEAR}
          className={classNames(cls.ThemeSwitcher, {}, [className])}
          onClick={toggleTheme}
    >
          { theme === Theme.LIGHT
            ? <LightIcon width={24} height={24}/>
            : <DarkIcon width={24} height={24}/>
        }
      </Button>
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher'

export { ThemeSwitcher }