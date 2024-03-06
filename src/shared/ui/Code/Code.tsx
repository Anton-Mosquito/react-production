import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Code.module.scss'
import { Button, ThemeButton } from '../Button/Button'
import CopyIcon from '@/shared/assets/icons/copy.svg'

interface CodeProps {
  className?: string
  text: string
}

const Code = memo(({ className, text }: CodeProps) => {
  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
  }, [text])

  return (
      <pre className={classNames(cls.Code, {}, [className])}>
          <Button className={cls.copyBtn} theme={ThemeButton.CLEAR} onClick={onCopy}>
              <CopyIcon className={cls.copyIcon}/>
          </Button>
          <code>
              {text}
          </code>
      </pre>
  )
})

Code.displayName = 'Code'

export { Code }
