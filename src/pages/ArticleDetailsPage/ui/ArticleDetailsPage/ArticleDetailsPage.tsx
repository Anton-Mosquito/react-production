import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useNavigate, useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  articleDetailsCommentsReducer, getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice'
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
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'widgets/Page/Page'

export interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps): JSX.Element => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
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
              <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                  {t('Назад к списку')}
              </Button>
              <ArticleDetails id={id}/>
              <Text className={cls.commentTitle} title={t('Коментарии')}/>
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
