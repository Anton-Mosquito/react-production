import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Dropdown } from '@/shared/ui/deprecated/Popups';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';

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

        return (
            <Dropdown
                className={classNames('', {}, [className])}
                direction="bottom left"
                items={[
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
                ]}
                trigger={
                    <Avatar size={30} src={authData.avatar} fallbackInverted />
                }
            />
        );
    },
);

AvatarDropdown.displayName = 'AvatarDropdown';
