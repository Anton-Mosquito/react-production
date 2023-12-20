import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'

interface NavbarProps {
  className?: string
}
export const Navbar = ({ className = '' }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogOut = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData != null) {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR_INVERTED}
                className={cls.links}
                onClick={onLogOut}
          >
                {t('Вийти')}
            </Button>
        </div>
    )
  }

  return (
      <div className={classNames(cls.Navbar, {}, [className])}>
          <Button
              theme={ThemeButton.CLEAR_INVERTED}
              className={cls.links}
              onClick={onShowModal}
          >
              {t('Войти')}
          </Button>
          {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
      </div>
  )
}
