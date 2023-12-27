import React, { type ReactNode, memo, type ButtonHTMLAttributes, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR_INVERTED = 'clearInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
}

const Button = memo((
  {
    className = '',
    children,
    theme = ThemeButton.CLEAR,
    square = false,
    size = ButtonSize.M,
    disabled = false,
    ...otherProps
  }: ButtonProps) => {
  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled
  }

  return (
      <button
          type='button'
          className={classNames(cls.Button, mods, [cls[theme], cls[size], className])}
          disabled={disabled}
          {...otherProps}
      >
          { children }
      </button>
  )
})

Button.displayName = 'Button'

export { Button }
