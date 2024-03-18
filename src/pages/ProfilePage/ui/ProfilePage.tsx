import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { VStack } from '@/shared/ui/Stack'
import { EditableProfileCard } from '@/features/editableProfileCard'
import { useParams } from 'react-router-dom'
import { Page } from '@/widgets/Page'

export interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps): JSX.Element => {
  const { id } = useParams<{ id: string }>()

  return (
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
          <VStack gap='16' max>
              <EditableProfileCard id={id}/>
          </VStack>
      </Page>
  )
}

export default ProfilePage
