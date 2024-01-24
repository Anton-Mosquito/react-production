import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { useTranslation } from 'react-i18next'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  ProfileCard, fetchProfileData, getProfileForm,
  getProfileError, getProfileIsLoading, getProfileReadonly,
  profileActions, profileReducer, getProfileValidateErrors,
  ValidateProfileError
} from 'entities/Profile'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { type Currency } from 'entities/Currency'
import { type Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useParams } from 'react-router-dom'

const reducers: ReducersList = {
  profile: profileReducer
}
export interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className = '' }: ProfilePageProps): JSX.Element => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)
  const { id } = useParams<{ id: string }>()
  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Cерверная ошибка при сохранении'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некоректний возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некоректний регион'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательни'),
    [ValidateProfileError.NO_DATA]: t('Данние не указани')
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value }))
  }, [dispatch])

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value }))
  }, [dispatch])

  const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value ?? 0) }))
  }, [dispatch])

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value }))
  }, [dispatch])

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value }))
  }, [dispatch])

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value }))
  }, [dispatch])

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }))
  }, [dispatch])

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }))
  }, [dispatch])

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
          <div className={classNames(cls.ProfilePage, {}, [className])}>
              <ProfilePageHeader/>
              {validateErrors?.length > 0 && validateErrors.map((err) => (
                  <Text
                      key={err}
                      theme={TextTheme.ERROR}
                      text={validateErrorTranslates[err]}
                />
              ))}
              <ProfileCard
                  data={formData}
                  error={error}
                  isLoading={isLoading}
                  readonly={readonly}
                  onChangeFirstName={onChangeFirstName}
                  onChangeLastName={onChangeLastName}
                  onChangeAge={onChangeAge}
                  onChangeCity={onChangeCity}
                  onChangeUsername={onChangeUsername}
                  onChangeAvatar={onChangeAvatar}
                  onChangeCurrency={onChangeCurrency}
                  onChangeCountry={onChangeCountry}
              />
          </div>
      </DynamicModuleLoader>
  )
}

export default ProfilePage
