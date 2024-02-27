import { type HTMLAttributeAnchorTarget, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { type Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { List, type ListRowProps, WindowScroller } from 'react-virtualized'
import { PAGE_ID } from 'widgets/Page/Page'
import { ArticleView } from '../../model/consts/articleConsts'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
  view?: ArticleView
  virtualized?: boolean
}

const getSkeleton = (view: ArticleView): JSX.Element[] =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view}/>
    ))

const ArticleList = memo(({
  className,
  articles,
  isLoading,
  view = ArticleView.SMALL,
  target,
  virtualized = true
}: ArticleListProps): JSX.Element => {
  const { t } = useTranslation()
  const isBig = view === ArticleView.BIG
  const itemsPerRow = isBig ? 1 : 3
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

  const rowRender = ({ index, isScrolling, key, style }: ListRowProps): JSX.Element => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
          <ArticleListItem
              article={articles[i]}
              view={view}
              className={cls.card}
              target={target}
              key={articles[i].id}
            />
      )
    }

    return (
        <div
            key={key}
            style={style}
        >
            {items}
        </div>
    )
  }

  if (!isLoading && (articles.length > 0)) {
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            <Text title={t('Статьи не найдени')} size={TextSize.L}/>
        </div>
    )
  }
  return (
      <WindowScroller
          scrollElement={document.getElementById(PAGE_ID) as Element}
      >
          {({
            width,
            height,
            registerChild,
            onChildScroll,
            isScrolling,
            scrollTop
          }) => (
              <div
                  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                  ref={(ref) => (ref != null) && registerChild(ref as unknown as React.ReactNode)}
                  className={classNames(cls.ArticleList, {}, [className, cls[view]])}
              >
                  {virtualized
                    ? (
                        <List
                            height={height ?? 700}
                            rowCount={rowCount}
                            rowHeight={isBig ? 700 : 330}
                            rowRenderer={rowRender}
                            width={width ? width - 80 : 700}
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                  />)
                    : (
                        articles.map(item => (
                            <ArticleListItem
                                article={item}
                                view={view}
                                target={target}
                                className={cls.card}
                                key={item.id}
                            />
                        ))
                      )}
                  { isLoading && getSkeleton(view)}
              </div>
          )}
      </WindowScroller>
  )
})

ArticleList.displayName = 'ArticleList'

export { ArticleList }
