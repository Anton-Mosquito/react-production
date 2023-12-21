import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'
import { memo } from 'react'

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
}

const Text = memo(({
  className = '',
  title = '',
  text = '',
  theme = TextTheme.PRIMARY
}: TextProps): JSX.Element => {
  return (
      <div className={classNames(cls.Text, {}, [className, cls[theme]])}>
          {(Boolean(title)) && <p className={cls.title}> { title }</p>}
          {(Boolean(text)) && <p className={cls.text}>{ text }</p>}
      </div>
  )
})

Text.displayName = 'Text'

export { Text }
