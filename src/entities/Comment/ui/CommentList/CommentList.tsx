import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { type Comment } from '../../model/types/comments';
import { Text } from '@/shared/ui/deprecated/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

const CommentList = memo(
    ({ className, comments, isLoading }: CommentListProps): JSX.Element => {
        const { t } = useTranslation();

        if (isLoading) {
            return (
                <VStack
                    className={classNames('', {}, [className])}
                    gap="16"
                    max
                >
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            );
        }
        return (
            <VStack className={classNames('', {}, [className])} gap="16" max>
                {comments?.length ? (
                    comments.map(comment => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            isLoading={isLoading}
                        />
                    ))
                ) : (
                    <Text text={t('Коментарии отсутствуют')} />
                )}
            </VStack>
        );
    },
);

CommentList.displayName = 'CommentList';

export { CommentList };
