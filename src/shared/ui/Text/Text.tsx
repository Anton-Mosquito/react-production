import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'
import { memo } from 'react'

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
  align?: TextAlign
}

const Text = memo(({
  className = '',
  title = '',
  text = '',
  theme = TextTheme.PRIMARY,
  align = TextAlign.LEFT
}: TextProps): JSX.Element => {

  const mods: Mods = {
    [cls[align]]: true
  }

  return (
      <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align]])}>
          {(Boolean(title)) && <p className={cls.title}> { title }</p>}
          {(Boolean(text)) && <p className={cls.text}>{ text }</p>}
      </div>
  )
})

Text.displayName = 'Text'

export { Text }
