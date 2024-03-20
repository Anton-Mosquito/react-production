import { memo, useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { LoginModal } from '@/features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { NotificationButton } from '@/features/notificationButton'
import { AvatarDropdown } from '@/features/avatarDropdown'
import { RoutePath } from '@/shared/const/router'

interface NavbarProps {
  className?: string
}

const Navbar = memo(({ className }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

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
            <HStack gap='16' className={cls.actions}>
                <NotificationButton />
                <AvatarDropdown/>
            </HStack>
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
