import { Fragment, type ReactNode, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import { Listbox as HListBox } from '@headlessui/react'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../Stack'
import { type DropdownDirection } from 'shared/types/ui'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

const ListBox = memo(({
  className,
  items,
  value,
  defaultValue,
  readonly,
  onChange,
  direction = 'top right',
  label
}: ListBoxProps): JSX.Element => {
  const optionsClasses = [mapDirectionClass[direction]]
  return (
      <HStack gap='4'>
          {label && <span>{`${label}>`}</span>}
          <HListBox
              className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
              as='div'
              value={value}
              onChange={onChange}
              disabled={readonly}
          >
              <HListBox.Button className={cls.trigger}>
                  <Button disabled={readonly}>
                      {value ?? defaultValue}
                  </Button>
              </HListBox.Button>
              <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                  {items?.map((item) => (
                      <HListBox.Option
                          key={item.value}
                          value={item.value}
                          disabled={item.disabled}
                          as={Fragment}
                      >
                          {({ active, selected }) => (
                              <li className={classNames(
                                cls.item,
                                {
                                  [popupCls.active]: active,
                                  [popupCls.disabled]: item.disabled
                                },
                                []
                              )}>
                                  {selected && '!!!'}
                                  {item.content}
                              </li>
                          )}
                      </HListBox.Option>
                  ))}
              </HListBox.Options>
          </HListBox>
      </HStack>
  )
})

ListBox.displayName = 'ListBox'

export { ListBox }
