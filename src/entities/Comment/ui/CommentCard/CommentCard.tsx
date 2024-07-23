import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { type Comment } from '../../model/types/comments';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteProfile } from '@/shared/const/router';
import { toggleFeature, ToggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

const CommentCard = memo(
    ({ className, comment, isLoading }: CommentCardProps): JSX.Element => {
        const Skeleton = toggleFeature({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });
        if (isLoading) {
            return (
                <VStack
                    data-testid="CommentCard.Loading"
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, {}, [
                        className,
                        cls.loading,
                    ])}
                >
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton
                            className={cls.username}
                            height={16}
                            width={100}
                        />
                    </div>
                    <Skeleton className={cls.text} width="100%" height={50} />
                </VStack>
            );
        }

        if (!comment) {
            return <></>;
        }

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" border="partial" max>
                        <VStack
                            data-testid="CommentCard.Content"
                            className={classNames(
                                cls.CommentCardRedesigned,
                                {},
                                [className],
                            )}
                            gap="8"
                            max
                        >
                            <AppLink to={getRouteProfile(comment.user.id)}>
                                <HStack gap="8">
                                    {comment.user.avatar ? (
                                        <Avatar
                                            size={30}
                                            src={comment.user.avatar}
                                        />
                                    ) : null}
                                    <Text title={comment.user.username} />
                                </HStack>
                            </AppLink>
                            <Text text={comment.text} />
                        </VStack>
                    </Card>
                }
                off={
                    <VStack
                        data-testid="CommentCard.Content"
                        className={classNames(cls.CommentCard, {}, [className])}
                        gap="8"
                        max
                    >
                        <AppLinkDeprecated
                            className={cls.header}
                            to={getRouteProfile(comment.user.id)}
                        >
                            {comment.user.avatar ? (
                                <AvatarDeprecated
                                    size={30}
                                    src={comment.user.avatar}
                                />
                            ) : null}
                            <TextDeprecated
                                className={cls.username}
                                title={comment.user.username}
                            />
                        </AppLinkDeprecated>
                        <TextDeprecated
                            className={cls.text}
                            text={comment.text}
                        />
                    </VStack>
                }
            />
        );
    },
);

CommentCard.displayName = 'CommentCard';

export { CommentCard };
