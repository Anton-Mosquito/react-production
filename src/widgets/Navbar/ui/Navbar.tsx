import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared/ui/Modal'
import { Button, ThemeButton } from 'shared/ui/Button/Button'

interface NavbarProps {
  className?: string
}
export const Navbar = ({ className = '' }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev)
  }, [])

  return (
      <div className={classNames(cls.Navbar, {}, [className])}>
          <Button
              theme={ThemeButton.CLEAR_INVERTED}
              className={cls.links}
              onClick={onToggleModal}
          >
              {t('Войти')}
          </Button>
          <Modal isOpen={isAuthModal} onClose={onToggleModal}>
              {/* eslint-disable-next-line */}
                {t('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.')}
          </Modal>
      </div>
  )
}
