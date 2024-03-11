import { Fragment, type ReactNode, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import { Menu } from '@headlessui/react'
import { type DropdownDirection } from '@/shared/types/ui'
import { AppLink } from '../../../AppLink/AppLinks'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropdownDirection
}

const Dropdown = memo(({
  className,
  items,
  trigger,
  direction = 'top right'
}: DropdownProps): JSX.Element => {
  const menuClasses = [mapDirectionClass[direction]]
  return (
      <Menu as='div' className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
          <Menu.Button className={popupCls.trigger}>
              {trigger}
          </Menu.Button>
          <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
              {items.map((item, index) => {
                const content = ({ active }: { active: boolean }): JSX.Element => (
                    <button
                        type='button'
                        disabled={item.disabled}
                        className={classNames(cls.item, { [popupCls.active]: active }, [])}
                        onClick={item.onClick}
                          >
                        {item.content}
                    </button>
                )

                if (item.href) {
                  return (
                      <Menu.Item
                          as={AppLink}
                          disabled={item.disabled}
                          key={`dropdwon-key${index}`}
                          to={item.href}
                      >
                          {content}
                      </Menu.Item>
                  )
                }
                return (
                    <Menu.Item
                        as={Fragment}
                        disabled={item.disabled}
                        key={`dropdwon-key${index}`}
                    >
                        {content}
                    </Menu.Item>
                )
              }
              )}

          </Menu.Items>
      </Menu>
  )
})

Dropdown.displayName = 'Dropdown'

export { Dropdown }
