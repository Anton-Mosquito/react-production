import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { type Mods, classNames } from '@/shared/lib/classNames/classNames';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { useTranslation } from 'react-i18next';
import { type ProfileCardProps } from '../ProfileCard/ProfileCard';
import cls from './ProfileCardDeprecated.module.scss';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedSkeleton = (): JSX.Element => {
    return (
        <HStack
            className={classNames(cls.ProfileCard, {}, [cls.loading])}
            justify="center"
            max
        >
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecatedError = (): JSX.Element => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            className={classNames(cls.ProfileCard, {}, [cls.error])}
            justify="center"
            max
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};
export const ProfileCardDeprecated = (props: ProfileCardProps): JSX.Element => {
    const {
        className,
        data,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            className={classNames(cls.ProfileCard, mods, [className])}
            gap="8"
            max
        >
            {data?.avatar && (
                <HStack className={cls.avatarWrapper} justify="center" max>
                    <AvatarDeprecated src={data?.avatar} alt={data?.avatar} />
                </HStack>
            )}
            <InputDeprecated
                value={data?.first}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstName}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />
            <InputDeprecated
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastName}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />
            <InputDeprecated
                value={data?.age}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.username}
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <InputDeprecated
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
    );
};
