import cls from './SidebarItem.module.scss'
import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLinks'
import { type SidebarItemType } from '../../model/items'
import { classNames } from 'shared/lib/classNames/classNames'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = ({ item, collapsed }: SidebarItemProps): JSX.Element => {
  const { t } = useTranslation()
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
