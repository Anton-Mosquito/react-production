import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

export interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({ className = '' }: ArticleDetailsPageProps): JSX.Element => {
  const { t } = useTranslation('article')
  return (
      // eslint-disable-next-line i18next/no-literal-string
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
          ARTICLE DETAILS
      </div>
  )
}

export default memo(ArticleDetailsPage)
