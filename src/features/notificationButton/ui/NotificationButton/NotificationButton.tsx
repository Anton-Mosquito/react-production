import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToggleFeatures } from '@/shared/lib/features';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
    className?: string;
}

const NotificationButton = memo(
    ({ className }: NotificationButtonProps): JSX.Element => {
        const [isOpen, setIsOpen] = useState(false);

        const onOpenDrawer = useCallback(() => {
            setIsOpen(true);
        }, []);

        const onCloseDrawer = useCallback(() => {
            setIsOpen(false);
        }, []);

        const trigger = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Icon
                        Svg={NotificationIcon}
                        clickable
                        onClick={onOpenDrawer}
                    />
                }
                off={
                    <ButtonDeprecated
                        theme={ThemeButton.CLEAR}
                        onClick={onOpenDrawer}
                    >
                        <IconDeprecated
                            Svg={NotificationIconDeprecated}
                            inverted
                        />
                    </ButtonDeprecated>
                }
            />
        );

        return (
            <div>
                <BrowserView>
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Popover
                                className={classNames(
                                    cls.NotificationButton,
                                    {},
                                    [className],
                                )}
                                direction="bottom left"
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </Popover>
                        }
                        off={
                            <PopoverDeprecated
                                className={classNames(
                                    cls.NotificationButton,
                                    {},
                                    [className],
                                )}
                                direction="bottom left"
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </PopoverDeprecated>
                        }
                    />
                </BrowserView>
                <MobileView>
                    {trigger}
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        <NotificationList className={cls.notifications} />
                    </Drawer>
                </MobileView>
            </div>
        );
    },
);

NotificationButton.displayName = 'NotificationButton';

export { NotificationButton };
