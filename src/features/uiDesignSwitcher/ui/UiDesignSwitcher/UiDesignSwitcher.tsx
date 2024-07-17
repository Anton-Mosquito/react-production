import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

const UiDesignSwitcher = memo(({ className }: UiDesignSwitcherProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAppRedesigned = getFeatureFlags('isAppRedesigned');
    const [isLoading, setIsLoading] = useState(false);
    const items = [
        {
            content: t('новый'),
            value: 'new',
        },
        {
            content: t('старый'),
            value: 'old',
        },
    ];
    const onChange = (value: string): void => {
        if (authData) {
            setIsLoading(true);
            dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            )
                .unwrap()
                .catch(error => {
                    // Handle the error here
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    return (
        <HStack>
            <Text text={t('Вариант интерфейса')} />
            {isLoading ? (
                <Skeleton width={100} height={40} />
            ) : (
                <ListBox
                    value={isAppRedesigned ? 'new' : 'old'}
                    items={items}
                    onChange={onChange}
                    className={className}
                />
            )}
        </HStack>
    );
});

UiDesignSwitcher.displayName = 'UiDesignSwitcher';

export { UiDesignSwitcher };