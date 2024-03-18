import { Page } from '@/widgets/Page'
import { useTranslation } from 'react-i18next'

const AdminPanelPage = (): JSX.Element => {
  const { t } = useTranslation('admin')

  return (
      <Page>
          {t('Админ панель')}
      </Page>
  )
}

export default AdminPanelPage
