import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleList } from '@/entities/Article'
import {
  getArticlesPageIsLoading,
  getArticlesPageError,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelector'
import { getArticles } from '../../model/slices/articlesPageSlice'
import { useSelector } from 'react-redux'
import { Text } from '@/shared/ui/Text/Text'

interface ArticleInfiniteListProps {
  className?: string
}

const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps): JSX.Element => {
  const { t } = useTranslation()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />
  }
  return (
      <ArticleList
          isLoading={isLoading}
          articles={articles}
          view={view}
          className={className}
      />
  )
})

ArticleInfiniteList.displayName = 'ArticleInfiniteList'

export { ArticleInfiniteList }
