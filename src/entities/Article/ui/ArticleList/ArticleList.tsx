import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { useTranslation } from 'react-i18next'
import { type Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
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
  view = ArticleView.SMALL
}: ArticleListProps): JSX.Element => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            { getSkeleton(view) }
        </div>
    )
  }

  const renderArticle = (article: Article): JSX.Element => {
    return (
        <ArticleListItem
            article={article}
            view={view}
            className={cls.card}
            key={article.id}
        />
    )
  }
  return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          { articles.length > 0
            ? articles.map(renderArticle)
            : null
          }
      </div>
  )
})

ArticleList.displayName = 'ArticleList'

export { ArticleList }
