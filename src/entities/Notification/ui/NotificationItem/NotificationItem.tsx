import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationItem.module.scss'
import { type Notification } from '../../model/types/notifications'
import { Card, CardTheme } from 'shared/ui/Card/Card'
import { Text } from 'shared/ui/Text/Text'

interface NotificationListItemProps {
  className?: string
  item: Notification
}

const NotificationItem = memo(({ className, item }: NotificationListItemProps): JSX.Element => {
  const content = (
      <Card
          theme={CardTheme.OUTLINED}
          className={classNames(cls.NotificationListItem, {}, [className])}
    >
          <Text title={item.title} text={item.description}/>
      </Card>
  )

  if (item.href) {
    return (
        <a
            className={cls.link}
            href={item.href}
            target='_blank'
            rel="noreferrer"
        >

        </a>
    )
  }

  return content
})

NotificationItem.displayName = 'NotificationItem'

export { NotificationItem }
