import { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import { Popover } from 'shared/ui/Popups/ui/Popover/Popover'
import { NotificationList } from 'entities/Notification'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { Drawer } from 'shared/ui/Drawer/Drawer'
import { BrowserView, MobileView } from 'react-device-detect'
import { AnimationProvider } from 'shared/lib/components/AnimationProvider'

interface NotificationButtonProps {
  className?: string
}

const NotificationButton = memo(({ className }: NotificationButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = (
      <Button theme={ThemeButton.CLEAR} onClick={onOpenDrawer}>
          <Icon Svg={NotificationIcon} inverted/>
      </Button>
  )

  return (
      <div>
          <BrowserView>
              <Popover
                  className={classNames(cls.NotificationButton, {}, [className])}
                  direction='bottom left'
                  trigger={trigger}
          >
                  <NotificationList className={cls.notifications}/>
              </Popover>
          </BrowserView>
          <MobileView>
              {trigger}
              <AnimationProvider>
                  <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                      <NotificationList className={cls.notifications}/>
                  </Drawer>
              </AnimationProvider>
          </MobileView>

      </div>
  )
})

NotificationButton.displayName = 'NotificationButton'

export { NotificationButton }
