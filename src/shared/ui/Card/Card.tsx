import { type ReactNode, memo, type HTMLAttributes } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

const Card = memo(({ className, children, ...otherProps }: CardProps): JSX.Element => {
  return (
      <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
          { children }
      </div>
  )
})

Card.displayName = 'Card'

export { Card }
