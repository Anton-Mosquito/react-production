import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { useState, type ReactNode, useRef, useEffect, useCallback, type MutableRefObject } from 'react'
import { Portal } from '../../Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'
import { Overlay } from '../../Overlay/Overlay'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = ({
  className = '',
  children,
  isOpen = false,
  onClose,
  lazy
}: ModalProps): JSX.Element | null => {
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
  const { theme } = useTheme()

  const closeHandler = useCallback((): void => {
    if (onClose != null) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onKeyDown = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

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
              <Overlay onClick={closeHandler}/>
              <div className={cls.content}>
                  {children}
              </div>
          </div>
      </Portal>
  )
}
