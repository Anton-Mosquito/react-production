import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = memo(({ className, articleId }: ArticleRatingProps): JSX.Element => {
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? ''
  })
  const [rateArticleMutation] = useRateArticle()

  const handleRateArticle = useCallback(async (starsCount: number, feedback?: string) => {
    try {
      await rateArticleMutation({
        userId: userData?.id ?? '',
        articleId,
        rate: starsCount,
        feedback
      })
    } catch (error) {
      console.log('🚀 ~ handleRateArticle ~ error:', error)
    }
  }, [articleId, rateArticleMutation, userData?.id])

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }, [handleRateArticle])

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount)
  }, [handleRateArticle])

  if (isLoading) {
    return <Skeleton width='100%' height={120}/>
  }

  const rating = data?.[0]

  return (
      <RatingCard
          className={className}
          title={t('Оцените статью')}
          feedbackTitle={t('Оставьте свой отзив о статье')}
          hasFeedback
          rate={rating?.rate}
          onAccept={onAccept}
          onCancel={onCancel}
      />
  )
})

ArticleRating.displayName = 'ArticleRating'

export default ArticleRating
