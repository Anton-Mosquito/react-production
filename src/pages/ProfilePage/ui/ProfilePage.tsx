import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { Page } from 'widgets/Page/Page'
import { VStack } from 'shared/ui/Stack'
import { EditableProfileCard } from 'features/editableProfileCard'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'

export interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps): JSX.Element => {
  const { t } = useTranslation('profile')
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Text text={t('Профиль не найдено')}/>
  }
  return (
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
          <VStack gap='16' max>
              <EditableProfileCard id={id}/>
          </VStack>
      </Page>
  )
}

export default ProfilePage
