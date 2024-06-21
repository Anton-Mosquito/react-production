import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(
    ({ className }: AvatarDropdownProps): JSX.Element | null => {
        const { t } = useTranslation();
        const dispatch = useDispatch();
        const authData = useSelector(getUserAuthData);
        const isAdmin = useSelector(isUserAdmin);
        const isManager = useSelector(isUserManager);

        const onLogOut = useCallback(() => {
            dispatch(userActions.logout());
        }, [dispatch]);

        const isAdminPanelAvailable = isAdmin || isManager;

        if (!authData) {
            return null;
        }

        const items = [
            ...(isAdminPanelAvailable
                ? [
                      {
                          content: t('Админка'),
                          href: getRouteAdminPanel(),
                      },
                  ]
                : []),
            {
                content: t('Профиль'),
                href: getRouteProfile(authData.id),
            },
            {
                content: t('Вийти'),
                onClick: onLogOut,
            },
        ];

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Dropdown
                        className={classNames('', {}, [className])}
                        direction="bottom left"
                        items={items}
                        trigger={<Avatar size={40} src={authData.avatar} />}
                    />
                }
                off={
                    <DropdownDeprecated
                        className={classNames('', {}, [className])}
                        direction="bottom left"
                        items={items}
                        trigger={
                            <AvatarDeprecated
                                size={30}
                                src={authData.avatar}
                                fallbackInverted
                            />
                        }
                    />
                }
            />
        );
    },
);

AvatarDropdown.displayName = 'AvatarDropdown';
