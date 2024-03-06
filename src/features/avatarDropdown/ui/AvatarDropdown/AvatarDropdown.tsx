import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AvatarDropdown.module.scss'
import { useTranslation } from 'react-i18next'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User'
import { useDispatch, useSelector } from 'react-redux'

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps): JSX.Element | null => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const authData = useSelector(getUserAuthData)
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)

  const onLogOut = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) {
    return null
  }

  return (
      <Dropdown
          className={classNames(cls.AvatarDropdown, {}, [className])}
          direction='bottom left'
          items={[
            ...(isAdminPanelAvailable
              ? [{
                  content: t('Админка'),
                  href: RoutePath.admin_panel
                }]
              : []),
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
  )
})

AvatarDropdown.displayName = 'AvatarDropdown'
