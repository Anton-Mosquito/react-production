import { type Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text'
import { Input } from '@/shared/ui/Input'
import { type Profile } from '../../model/types/profile'
import { Loader } from '@/shared/ui/Loader'
import { Avatar } from '@/shared/ui/Avatar'
import { type Currency, CurrencySelect } from '@/entities/Currency'
import { type Country, CountrySelect } from '@/entities/Country'
import { HStack, VStack } from '@/shared/ui/Stack'

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  onChangeFirstName?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCard = ({
  className,
  data,
  isLoading,
  error,
  readonly,
  onChangeFirstName,
  onChangeLastName,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatar,
  onChangeCurrency,
  onChangeCountry
}: ProfileCardProps): JSX.Element => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
        <HStack
            className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            justify='center'
            max
        >
            <Loader/>
        </HStack>
    )
  }

  if (error) {
    return (
        <HStack
            className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            justify='center'
            max
        >
            <Text
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
      <VStack
          className={classNames(cls.ProfileCard, mods, [className])}
          gap='8'
          max
      >
          { data?.avatar && (
              <HStack
                  className={cls.avatarWrapper}
                  justify='center'
                  max
              >
                  <Avatar src={data?.avatar} alt={data?.avatar} />
              </HStack>
          )}
          <Input
              value={data?.first}
              placeholder={t('Ваше имя')}
              className={cls.input}
              onChange={onChangeFirstName}
              readonly={readonly}
              data-testid='ProfileCard.firstname'
              />
          <Input
              value={data?.lastname}
              placeholder={t('Ваша фамилия')}
              className={cls.input}
              onChange={onChangeLastName}
              readonly={readonly}
              data-testid='ProfileCard.lastname'
              />
          <Input
              value={data?.age}
              placeholder={t('Ваш возраст')}
              className={cls.input}
              onChange={onChangeAge}
              readonly={readonly}
              />
          <Input
              value={data?.city}
              placeholder={t('Город')}
              className={cls.input}
              onChange={onChangeCity}
              readonly={readonly}
              />
          <Input
              value={data?.username}
              placeholder={t('Введите имя пользователя')}
              className={cls.input}
              onChange={onChangeUsername}
              readonly={readonly}
              />
          <Input
              value={data?.avatar}
              placeholder={t('Введите ссылку на аватар')}
              className={cls.input}
              onChange={onChangeAvatar}
              readonly={readonly}
              />
          <CurrencySelect
              className={cls.input}
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
              />
          <CountrySelect
              className={cls.input}
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
              />
      </VStack>
  )
}
