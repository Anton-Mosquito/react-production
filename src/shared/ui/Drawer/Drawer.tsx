import { memo, type PropsWithChildren } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { useTheme } from 'app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from 'shared/lib/hooks/useModal/useModal'

interface DrawerProps extends PropsWithChildren {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Drawer = memo(({ className, children, isOpen, onClose, lazy }: DrawerProps): JSX.Element | null => {
  const { theme } = useTheme()
  const { isClosing, isMounted, close } = useModal({
    animationDelay: 300,
    isOpen,
    onClose
  })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }
  return (
      <Portal >
          <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
              <Overlay onClick={close} />
              <div className={cls.content}>
                  { children}
              </div>
          </div>
      </Portal>
  )
})

Drawer.displayName = 'Drawer'
