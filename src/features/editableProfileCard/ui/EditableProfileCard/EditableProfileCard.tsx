import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { type Country } from '@/entities/Country';
import { type Currency } from '@/entities/Currency';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { ProfileCard } from '@/entities/Profile';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer, profileActions } from '../../model/slice/profileSlice';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { EditProfileCardHeader } from '../EditProfileCardHeader/EditProfileCardHeader';
import { VStack } from '@/shared/ui/Stack';
import { ValidateProfileError } from '../../model/consts/consts';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const EditableProfileCard = memo(
    ({ className, id }: EditableProfileCardProps) => {
        const { t } = useTranslation('profile');
        const dispatch = useAppDispatch();
        const formData = useSelector(getProfileForm);
        const error = useSelector(getProfileError);
        const isLoading = useSelector(getProfileIsLoading);
        const readonly = useSelector(getProfileReadonly);
        const validateErrors = useSelector(getProfileValidateErrors);
        const validateErrorTranslates = {
            [ValidateProfileError.SERVER_ERROR]: t(
                'Cерверная ошибка при сохранении',
            ),
            [ValidateProfileError.INCORRECT_AGE]: t('Некоректний возраст'),
            [ValidateProfileError.INCORRECT_COUNTRY]: t('Некоректний регион'),
            [ValidateProfileError.INCORRECT_USER_DATA]: t(
                'Имя и фамилия обязательни',
            ),
            [ValidateProfileError.NO_DATA]: t('Данние не указани'),
        };

        useInitialEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id));
            }
        });

        const onChangeFirstName = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ first: value }));
            },
            [dispatch],
        );

        const onChangeLastName = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ lastname: value }));
            },
            [dispatch],
        );

        const onChangeAge = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ age: Number(value ?? 0) }),
                );
            },
            [dispatch],
        );

        const onChangeCity = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ city: value }));
            },
            [dispatch],
        );

        const onChangeUsername = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ username: value }));
            },
            [dispatch],
        );

        const onChangeAvatar = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ avatar: value }));
            },
            [dispatch],
        );

        const onChangeCurrency = useCallback(
            (currency: Currency) => {
                dispatch(profileActions.updateProfile({ currency }));
            },
            [dispatch],
        );

        const onChangeCountry = useCallback(
            (country: Country) => {
                dispatch(profileActions.updateProfile({ country }));
            },
            [dispatch],
        );

        return (
            <DynamicModuleLoader reducers={reducers}>
                <VStack className={classNames('', {}, [className])} gap="8" max>
                    <EditProfileCardHeader />
                    {validateErrors?.length > 0 &&
                        validateErrors.map(err => (
                            <Text
                                key={err}
                                theme={TextTheme.ERROR}
                                text={validateErrorTranslates[err]}
                                data-testid="EditableProfileCard.Error"
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
                </VStack>
            </DynamicModuleLoader>
        );
    },
);

EditableProfileCard.displayName = 'EditableProfileCard';

export { EditableProfileCard };
