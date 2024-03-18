import { Page } from '@/widgets/Page'
import { useTranslation } from 'react-i18next'

const AboutPage = (): JSX.Element => {
  const { t } = useTranslation('about')

  return (
      <Page>
          {t('O сайте')}
      </Page>
  )
}

export default AboutPage
