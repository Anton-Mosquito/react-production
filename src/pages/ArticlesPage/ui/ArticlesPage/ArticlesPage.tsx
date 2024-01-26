import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { ArticleList } from 'entities/Article'

export interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps): JSX.Element => {
  const { t } = useTranslation()
  return (
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
          <ArticleList articles={[]}/>
      </div>
  )
}

export default memo(ArticlesPage)
