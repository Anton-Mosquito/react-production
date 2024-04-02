import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Page } from '@/widgets/Page'

export interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps): JSX.Element => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  return (
      <Page className={classNames('', {}, [className])} data-testid='ArticleEditPage'>
          {isEdit
            ? t('Редактирование статьи') + id
            : t('Создание новой статьи')}
      </Page>
  )
})

ArticleEditPage.displayName = 'ArticleEditPage'

export default ArticleEditPage
