import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/addCommentForm'
import { useTranslation } from 'react-i18next'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from 'shared/ui/Stack'
import { t } from 'i18next'

interface ArticleDetailsCommentsProps {
  className?: string
  id: string
}

const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps): JSX.Element => {
  const { t } = useTranslation('article-details')
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  return (
      <VStack gap='16' className={classNames('', {}, [className])}>
          <Text
              size={TextSize.L}
              title={t('Коментарии')}
                  />
          <AddCommentForm onSendComment={onSendComment}/>
          <CommentList
              isLoading={commentsIsLoading}
              comments={comments}
                  />
      </VStack>
  )
})

ArticleDetailsComments.displayName = 'ArticleDetailsComments'

export { ArticleDetailsComments }
