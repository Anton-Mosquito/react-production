import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCanEditArticle } from '../../model/selectors/article'
import { getArticleDetailsData } from 'entities/Article'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

const ArticleDetailsPageHeader = memo(({ className = '' }: ArticleDetailsPageHeaderProps): JSX.Element => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const canEdit = useSelector(getCanEditArticle)
  const article = useSelector(getArticleDetailsData)

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}edit`)
  }, [article?.id, navigate])

  return (
      <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
          <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
              {t('Назад к списку')}
          </Button>
          { canEdit && (
          <Button
              className={cls.editBtn}
              theme={ThemeButton.OUTLINE}
              onClick={onEditArticle}
            >
              {t('Редактировать ')}
          </Button>
          ) }
      </div>
  )
})

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader'

export { ArticleDetailsPageHeader }
