import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlePagesFilters.module.scss'
import { useTranslation } from 'react-i18next'
import {
  type ArticleView,
  ArticleViewSelector,
  ArticleSortSelector,
  type ArticleSortField,
  ArticleTypeTabs
} from 'entities/Article'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import { useSelector } from 'react-redux'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelector'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input'
import { type SortOrder } from 'shared/types'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { type ArticleType } from 'entities/Article/model/types/article'

interface ArticlePagesFiltersProps {
  className?: string
}

const ArticlePagesFilters = memo(({ className }: ArticlePagesFiltersProps): JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView)
  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  const debounceFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
    dispatch(articlesPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder))
    dispatch(articlesPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort))
    dispatch(articlesPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search))
    dispatch(articlesPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value))
    dispatch(articlesPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  return (
      <div className={classNames(cls.ArticlePagesFilters, {}, [className])}>
          <div className={cls.sortWrapper}>\
              <ArticleSortSelector
                  order={order}
                  sort={sort}
                  onChangeOrder={onChangeOrder}
                  onChangeSort={onChangeSort}
              />
              <ArticleViewSelector view={view} onViewClick={onChangeView}/>
          </div>
          <Card className={cls.search}>
              <Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch}/>
          </Card>
          <ArticleTypeTabs value={type} onChangeType={onChangeType}/>
      </div>
  )
})

ArticlePagesFilters.displayName = 'ArticlePagesFilters'

export { ArticlePagesFilters }
