import { type Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import { type ChangeEvent, memo, useMemo } from 'react'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

const Select = memo(<T extends string>({
  className,
  label,
  options,
  value,
  onChange,
  readonly
}: SelectProps<T>) => {
  const mods: Mods = {}

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void =>
    onChange?.(e.target.value as T)

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

Select.displayName = 'Select'

export { Select }
