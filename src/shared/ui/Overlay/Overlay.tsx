import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Overlay.module.scss'

interface OverlayProps {
  className?: string
  onClick?: () => void
}

export const Overlay = memo(({ className, onClick }: OverlayProps): JSX.Element => {
  return (
      <div className={classNames(cls.Overlay, {}, [className])} onClick={onClick}/>
  )
})

Overlay.displayName = 'Overlay'
