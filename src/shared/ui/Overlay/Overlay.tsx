import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Overlay.module.scss'

interface OverlayProps {
  className?: string
  onCLick?: () => void
}

export const Overlay = memo(({ className, onCLick }: OverlayProps): JSX.Element => {
  return (
      <div className={classNames(cls.Overlay, {}, [className])} onClick={onCLick}/>
  )
})

Overlay.displayName = 'Overlay'
