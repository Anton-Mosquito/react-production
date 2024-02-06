import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { memo, useCallback } from 'react'
import {
  ArticleList
} from 'entities/Article'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  articlesPageReducer,
  getArticles
} from '../../model/slices/articlesPageSlice'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelector'
import { Page } from 'widgets/Page/Page'
import {
  fetchNextArticlesPage
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlePagesFilters } from '../ArticlePagesFilters/ArticlePagesFilters'
import { useSearchParams } from 'react-router-dom'

export interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
          <Page
              className={classNames(cls.ArticlesPage, {}, [className])}
              onScrollEnd={onLoadNextPart}
          >
              <ArticlePagesFilters/>
              <ArticleList
                  isLoading={isLoading}
                  articles={articles}
                  view={view}
                  className={cls.list}
              />
          </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
