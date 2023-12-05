import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { type TFunction } from 'i18next/typescript/t'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = (
  { className = '' }: LangSwitcherProps
): JSX.Element => {
  const { t, i18n } = useTranslation()
  const toggle = async (): Promise<TFunction<'translation', undefined>> =>
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')

  return (
      <Button
          className={classNames(cls.LangSwitcher, {}, [className])}
          theme={ThemeButton.CLEAR}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={toggle}
      >
          {t('Язик')}
      </Button>
  )
}
