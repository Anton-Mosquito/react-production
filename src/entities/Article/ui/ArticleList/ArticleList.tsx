import { type HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { type Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { useTranslation } from 'react-i18next';
import { ArticleView } from '../../model/consts/articleConsts';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

const getSkeleton = (view: ArticleView): JSX.Element[] =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

const ArticleList = memo(
    ({
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
    }: ArticleListProps): JSX.Element => {
        const { t } = useTranslation();

        if (!isLoading && articles.length > 0) {
            return (
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Text title={t('Статьи не найдени')} size={TextSize.L} />
                </div>
            );
        }
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
                data-testid="ArticleList"
            >
                {articles.map(item => (
                    <ArticleListItem
                        article={item}
                        view={view}
                        target={target}
                        className={cls.card}
                        key={item.id}
                    />
                ))}
                {isLoading && getSkeleton(view)}
            </div>
        );
    },
);

ArticleList.displayName = 'ArticleList';

export { ArticleList };
