import { useState, useRef, type MutableRefObject, useCallback, useEffect } from 'react'

interface UseModalProps {
  isOpen?: boolean
  onClose?: () => void
  animationDelay: number
}

export function useModal ({ animationDelay, isOpen, onClose }: UseModalProps): {
  isClosing: boolean
  isMounted: boolean
  close: () => void
} {
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  const close = useCallback((): void => {
    if (onClose != null) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [animationDelay, onClose])

  const onKeyDown = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      close()
    }
  }, [close])

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

  return {
    isClosing,
    isMounted,
    close
  }
}
