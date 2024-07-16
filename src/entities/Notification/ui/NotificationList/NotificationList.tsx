import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeature } from '@/shared/lib/features';

interface NotificationListProps {
    className?: string;
}

const NotificationList = memo(
    ({ className }: NotificationListProps): JSX.Element => {
        const { data, isLoading } = useNotifications(null, {
            pollingInterval: 5000,
        });

        const Skeleton = toggleFeature({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        
        })

        if (isLoading) {
            return (
                <VStack
                    gap="16"
                    max
                    className={classNames(cls.NotificationList, {}, [
                        className,
                    ])}
                >
                    <Skeleton width="100%" border="8px" height="80px" />
                    <Skeleton width="100%" border="8px" height="80px" />
                    <Skeleton width="100%" border="8px" height="80px" />
                </VStack>
            );
        }
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                {data?.map(item => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </VStack>
        );
    },
);

NotificationList.displayName = 'NotificationList';

export { NotificationList };
