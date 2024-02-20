import React, { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLinks'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'

interface NavbarProps {
  className?: string
}
const Navbar = memo(({ className }: NavbarProps): JSX.Element => {
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
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
                className={cls.appName}
                title={t('Some title')}
                theme={TextTheme.INVERTED}
            />
            <AppLink
                className={cls.createBtn}
                to={RoutePath.article_create}
                theme={AppLinkTheme.SECONDARY}
            >
                {t('Создать статью')}
            </AppLink>
            <Dropdown
                className={cls.dropdown}
                direction='bottom left'
                items={[
                  {
                    content: t('Профиль'),
                    href: RoutePath.profile + authData.id
                  },
                  {
                    content: t('Вийти'),
                    onClick: onLogOut
                  }
                ]}
                trigger={<Avatar size={30} src={authData.avatar}/>}
            />
        </header>
    )
  }

  return (
      <header className={classNames(cls.Navbar, {}, [className])}>
          <Button
              theme={ThemeButton.CLEAR_INVERTED}
              className={cls.links}
              onClick={onShowModal}
          >
              {t('Войти')}
          </Button>
          {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
      </header>
  )
})

Navbar.displayName = 'Navbar'

export { Navbar }
