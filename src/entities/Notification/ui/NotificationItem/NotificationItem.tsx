import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { type Notification } from '../../model/types/notifications';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationListItemProps {
    className?: string;
    item: Notification;
}

const NotificationItem = memo(
    ({ className, item }: NotificationListItemProps): JSX.Element => {
        const content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        className={classNames(cls.NotificationListItem, {}, [
                            className,
                        ])}
                    >
                        <Text title={item.title} text={item.description} />
                    </Card>
                }
                off={
                    <CardDeprecated
                        theme={CardTheme.OUTLINED}
                        className={classNames(cls.NotificationListItem, {}, [
                            className,
                        ])}
                    >
                        <TextDeprecated
                            title={item.title}
                            text={item.description}
                        />
                    </CardDeprecated>
                }
            />
        );

        if (item.href) {
            return (
                <a
                    className={cls.link}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                ></a>
            );
        }

        return content;
    },
);

NotificationItem.displayName = 'NotificationItem';

export { NotificationItem };
