import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ArticleDetails, ArticleList } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {
  fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/addCommentForm'
import {
  addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import { Page } from 'widgets/Page/Page'
import { getArticleRecommendation } from '../../model/slices/articleDetailsRecommendationSlice'
import { getArticleRecommendationIsLoading } from '../../model/selectors/recomendations'
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

export interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps): JSX.Element => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendation.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const recommendationsIsLoading = useSelector(getArticleRecommendationIsLoading)
  const dispatch = useAppDispatch()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendations())
  })

  if (!id) {
    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
        </Page>
    )
  }
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
              <ArticleDetailsPageHeader/>
              <ArticleDetails id={id}/>
              <Text
                  className={cls.commentTitle}
                  size={TextSize.L}
                  title={t('Рекомендуем')}
              />
              <ArticleList
                  articles={recommendations}
                  isLoading={recommendationsIsLoading}
                  className={cls.recommendations}
                  target='_blank'
              />
              <Text
                  className={cls.commentTitle}
                  size={TextSize.L}
                  title={t('Коментарии')}
              />
              <AddCommentForm onSendComment={onSendComment}/>
              <CommentList
                  isLoading={commentsIsLoading}
                  comments={comments}
              />
          </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
