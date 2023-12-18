import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import { type ButtonHTMLAttributes, type FC } from 'react'

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
}

export const Button: FC<ButtonProps> = (
  {
    className = '',
    children,
    theme = ThemeButton.CLEAR,
    square = false,
    size = ButtonSize.M,
    disabled = false,
    ...otherProps
  }) => {
  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled
  }

  return (
      <button
          type='button'
          className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
          disabled={disabled}
          {...otherProps}
      >
          { children }
      </button>
  )
}
