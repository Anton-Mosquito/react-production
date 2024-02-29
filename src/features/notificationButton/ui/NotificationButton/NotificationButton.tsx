import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import { Popover } from 'shared/ui/Popups/ui/Popover/Popover'
import { NotificationList } from 'entities/Notification'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'

interface NotificationButtonProps {
  className?: string
}

const NotificationButton = memo(({ className }: NotificationButtonProps): JSX.Element => {
  return (
      <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction='bottom left'
          trigger={(<Button theme={ThemeButton.CLEAR}>
              <Icon Svg={NotificationIcon} inverted/>
          </Button>)}
      >
          <NotificationList className={cls.notifications}/>
      </Popover>
  )
})

NotificationButton.displayName = 'NotificationButton'

export { NotificationButton }
