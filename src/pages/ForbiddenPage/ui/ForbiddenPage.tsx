import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/Page'

const ForbiddenPage = (): JSX.Element => {
  const { t } = useTranslation('about')

  return (
      <Page>
          {t('O сайте')}
      </Page>
  )
}

export default ForbiddenPage
