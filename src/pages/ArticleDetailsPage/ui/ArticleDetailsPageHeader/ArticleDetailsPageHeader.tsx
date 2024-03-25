import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCanEditArticle } from '../../model/selectors/article'
import { getArticleDetailsData } from '@/entities/Article'
import { HStack } from '@/shared/ui/Stack'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

const ArticleDetailsPageHeader = memo(({ className = '' }: ArticleDetailsPageHeaderProps): JSX.Element => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const canEdit = useSelector(getCanEditArticle)
  const article = useSelector(getArticleDetailsData)

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles())
  }, [navigate])

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article?.id))
    }
  }, [article, navigate])

  return (
      <HStack
          className={classNames('', {}, [className])}
          justify='between'
          max
      >
          <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
              {t('Назад к списку')}
          </Button>
          { canEdit && (
          <Button
              theme={ThemeButton.OUTLINE}
              onClick={onEditArticle}
            >
              {t('Редактировать ')}
          </Button>
          ) }
      </HStack>
  )
})

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader'

export { ArticleDetailsPageHeader }
