import { classNames } from 'shared/lib/classNames/classNames';
import cls from  './ProfileCard.module.scss';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({className = '' }: ProfileCardProps): JSX.Element => {
  const { t } = useTranslation('profile')
  const data = useSelector(getProfileData)
  const error = useSelector(getProfileIsLoading)
  const isLoading = useSelector(getProfileError)
  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        <Button theme={ThemeButton.OUTLINE} className={cls.editBtn}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input 
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
        />
        <Input 
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
        />
      </div>
    </div>
  )
}