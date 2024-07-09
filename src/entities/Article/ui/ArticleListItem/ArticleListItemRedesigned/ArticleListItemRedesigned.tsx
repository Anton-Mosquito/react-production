import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { useTranslation } from 'react-i18next';
import { type ArticleTextBlock } from '../../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import {
    ArticleView,
    ArticleBlockType,
} from '../../../model/consts/articleConsts';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { type ArticleListItemProps } from '../ArticleListItem';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

const ArticleListItemRedesigned = memo(
    (props: ArticleListItemProps): JSX.Element => {
        const { className, article, view, target } = props;
        const { t } = useTranslation();

        const types = (
            <Text className={cls.types} text={article.type.join(', ')} />
        );
        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text className={cls.views} text={String(article.views)} />
            </HStack>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                block => block.type === ArticleBlockType.TEXT,
            ) as ArticleTextBlock;

            return (
                <Card
                    padding="24"
                    max
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticleListItem"
                >
                    <VStack max gap="16">
                        <HStack gap="8" max>
                            <Avatar src={article.user.avatar} size={32} />
                            <Text bold text={article.user.username} />
                            <Text text={article.createdAt} />
                        </HStack>
                        <Text title={article.title} bold />
                        <Text title={article.subtitle} size="s" />
                        <AppImage
                            className={cls.img}
                            src={article.img}
                            alt={article.title}
                            fallback={<Skeleton width="100%" height={250} />}
                        />
                        {textBlock.paragraphs && (
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs
                                    .slice(0, 2)
                                    .join(' ')}
                            />
                        )}
                        <HStack max justify="between">
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button variant="outline">
                                    {t('Читать далее ....')}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                    {types}
                </Card>
            );
        }

        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
                to={getRouteArticleDetails(article.id)}
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            className={cls.img}
                            src={article.img}
                            alt={article.title}
                            fallback={<Skeleton width={200} height={200} />}
                        />
                        <Text className={cls.date} text={article.createdAt} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} />
                </Card>
            </AppLink>
        );
    },
);

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';

export { ArticleListItemRedesigned };
