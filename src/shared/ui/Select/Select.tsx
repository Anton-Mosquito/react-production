import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import { type ChangeEvent, memo, useMemo } from 'react'

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo(({ className, label, options, value, onChange, readonly }: SelectProps) => {
  const mods: Mods = {}

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)

  const optionsList = useMemo(() => {
    return options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
      >
            {opt.content}
        </option>
    ))
  }, [options])

  return (
      <div className={classNames(cls.Wrapper, mods, [className])}>
          {label && (
          <span className={cls.label}>
              { `${label}>`}
          </span>
          )}
          <select
              name=""
              id=""
              disabled={readonly}
              className={cls.select}
              value={value}
              onChange={onChangeHandler}
      >
              { optionsList }
          </select>
      </div>
  )
})
