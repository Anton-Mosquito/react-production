import cls from './SidebarItem.module.scss'
import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLinks'
import { type SidebarItemType } from '../../model/types/sidebar'
import { classNames } from 'shared/lib/classNames/classNames'
import { getUserAuthData } from 'entities/User'
import { useSelector } from 'react-redux'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = ({ item, collapsed }: SidebarItemProps): JSX.Element | null => {
  const { t } = useTranslation()
  const isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth) {
    return null
  }

  return (
      <AppLink
          to={item.path}
          className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
          theme={AppLinkTheme.SECONDARY}
>
          <item.Icon className={cls.icon}/>
          <span className={cls.link}>{t(item.text)}</span>
      </AppLink>
  )
}
