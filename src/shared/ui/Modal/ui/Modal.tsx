import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { type ReactNode } from 'react'
import { Portal } from '../../Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'
import { Overlay } from '../../Overlay/Overlay'
import { useModal } from 'shared/lib/hooks/useModal/useModal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = ({
  className,
  children,
  isOpen = false,
  onClose,
  lazy
}: ModalProps): JSX.Element | null => {
  const { theme } = useTheme()
  const { isClosing, isMounted, close } = useModal({
    animationDelay: ANIMATION_DELAY,
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
      <Portal>
          <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
              <Overlay onClick={close}/>
              <div className={cls.content}>
                  {children}
              </div>
          </div>
      </Portal>
  )
}
