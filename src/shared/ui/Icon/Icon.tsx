import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

const Icon = memo(({ className, Svg, inverted }: IconProps): JSX.Element => {
  return (
      <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} />
  )
})

Icon.displayName = 'Icon'

export { Icon }
