import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePagesFilters.module.scss';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlePagesFiltersProps {
    className?: string;
}

const ArticlePagesFilters = memo(
    ({ className }: ArticlePagesFiltersProps): JSX.Element => {
        const { t } = useTranslation();
        const {
            order,
            sort,
            view,
            search,
            type,
            onChangeOrder,
            onChangeSort,
            onChangeView,
            onChangeSearch,
            onChangeType,
        } = useArticleFilters();

        return (
            <div
                className={classNames(cls.ArticlePagesFilters, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        placeholder={t('Поиск')}
                        value={search}
                        onChange={onChangeSearch}
                    />
                </Card>
                <ArticleTypeTabs value={type} onChangeType={onChangeType} />
            </div>
        );
    },
);

ArticlePagesFilters.displayName = 'ArticlePagesFilters';

export { ArticlePagesFilters };
