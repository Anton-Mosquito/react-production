import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleViewSelector.module.scss'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { ArticleView } from '@/entities/Article'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon
  }
]

const ArticleViewSelector = memo(({
  className,
  view,
  onViewClick
}: ArticleViewSelectorProps): JSX.Element => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }
  return (
      <div className={classNames('', {}, [className])}>
          {viewTypes.map((viewType) => (
              <Button
                  theme={ThemeButton.CLEAR}
                  key={viewType.view}
                  onClick={onClick(viewType.view)}
              >
                  <Icon
                      className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                      Svg={viewType.icon}
                  />
              </Button>
          ))}
      </div>
  )
})

ArticleViewSelector.displayName = 'ArticleViewSelector'

export { ArticleViewSelector }
