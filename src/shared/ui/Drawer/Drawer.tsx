import { memo, type PropsWithChildren } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { useTheme } from 'app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

interface DrawerProps extends PropsWithChildren {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export const Drawer = memo(({ className, children, isOpen, onClose }: DrawerProps): JSX.Element => {
  const { theme } = useTheme()

  const mods: Mods = {
    [cls.opened]: isOpen
  }
  return (
      <Portal >
          <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
              <Overlay onClick={onClose} />
              <div className={cls.content}>
                  { children}
              </div>
          </div>
      </Portal>
  )
})

Drawer.displayName = 'Drawer'
