import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { useState, type ReactNode, useRef, useEffect, useCallback } from 'react'
import { Portal } from 'shared/ui/Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'

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
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
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

  const onContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
  }

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

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
      <Portal>
          <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
              <div className={cls.overlay} onClick={closeHandler}>
                  <div className={cls.content} onClick={onContentClick}>
                      {children}
                  </div>
              </div>
          </div>
      </Portal>
  )
}
