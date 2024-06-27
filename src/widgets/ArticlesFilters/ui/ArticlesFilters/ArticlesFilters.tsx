import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { Input } from '@/shared/ui/redesigned/Input';
import { type ArticleSortField, type ArticleType } from '@/entities/Article';
import { type SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo(
    ({
        className = '',
        sort,
        order,
        type,
        search,
        onChangeSearch,
        onChangeOrder,
        onChangeSort,
        onChangeType,
    }: ArticlesFiltersProps): JSX.Element => {
        const { t } = useTranslation();

        return (
            <Card
                className={classNames(cls.ArticlesFilters, {}, [className])}
                padding="24"
            >
                <VStack gap="32">
                    <Input
                        placeholder={t('Поиск')}
                        value={search}
                        onChange={onChangeSearch}
                    />
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleTypeTabs value={type} onChangeType={onChangeType} />
                </VStack>
            </Card>
        );
    },
);

ArticlesFilters.displayName = 'ArticlesFilters';
