import { Fragment, type ReactNode, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import { Menu } from '@headlessui/react'
import { type DropdownDirection } from 'shared/types/ui'
import { AppLink } from '../AppLink/AppLinks'

// DropdownDirection

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft
}

const Dropdown = memo(({
  className,
  items,
  trigger,
  direction = 'top right'
}: DropdownProps): JSX.Element => {
  const menuClasses = [mapDirectionClass[direction]]
  return (
      <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
          <Menu.Button className={cls.btn}>
              {trigger}
          </Menu.Button>
          <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
              {items.map((item, index) => {
                const content = ({ active }: { active: boolean }): JSX.Element => (
                    <button
                        type='button'
                        disabled={item.disabled}
                        className={classNames(cls.item, { [cls.active]: active }, [])}
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
                          key={index}
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
                        key={index}
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
