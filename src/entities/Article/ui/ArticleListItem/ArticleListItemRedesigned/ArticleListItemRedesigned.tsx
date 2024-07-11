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

        const userInfo = (
            <>
                <Avatar size={32} src={article.user.avatar} />
                <Text bold text={article.user.username} />
            </>
        );
        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text text={String(article.views)} className={cls.views} />
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
                            {userInfo}
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
                <Card className={cls.card} border="round">
                    <AppImage
                        className={cls.img}
                        src={article.img}
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                    />
                    <VStack gap="8" className={cls.info}>
                        <Text text={article.title} className={cls.title} />
                        <VStack gap="4" className={cls.footer} max>
                            <HStack justify="between" max>
                                <Text
                                    className={cls.date}
                                    text={article.createdAt}
                                />
                            </HStack>
                            <HStack gap='4'>{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        );
    },
);

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';

export { ArticleListItemRedesigned };
