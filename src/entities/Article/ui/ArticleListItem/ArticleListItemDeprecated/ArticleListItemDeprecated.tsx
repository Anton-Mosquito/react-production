import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleListItem.module.scss';
import { useTranslation } from 'react-i18next';
import { type ArticleTextBlock } from '../../../model/types/article';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import {
    ArticleView,
    ArticleBlockType,
} from '../../../model/consts/articleConsts';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { type ArticleListItemProps } from '../ArticleListItem';

const ArticleListItemDeprecated = memo(
    (props: ArticleListItemProps): JSX.Element => {
        const { className, article, view, target } = props;
        const { t } = useTranslation();

        const types = (
            <Text className={cls.types} text={article.type.join(', ')} />
        );
        const views = (
            <>
                <Text className={cls.views} text={String(article.views)} />
                <Icon Svg={EyeIcon} />
            </>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                block => block.type === ArticleBlockType.TEXT,
            ) as ArticleTextBlock;

            return (
                <div
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticleListItem"
                >
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <Avatar src={article.user.avatar} size={30} />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                        </div>
                        <Text title={article.title} className={cls.title} />
                        {types}
                        <AppImage
                            className={cls.img}
                            src={article.img}
                            alt={article.title}
                            fallback={<Skeleton width="100%" height={250} />}
                        />
                        {textBlock && (
                            <ArticleTextBlockComponent
                                block={textBlock}
                                className={cls.textBlock}
                            />
                        )}
                        <div className={cls.footer}>
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button theme={ThemeButton.OUTLINE}>
                                    {t('Читать далее ....')}
                                </Button>
                            </AppLink>
                            {views}
                        </div>
                    </Card>
                </div>
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

ArticleListItemDeprecated.displayName = 'ArticleListItemDeprecated';

export { ArticleListItemDeprecated };
