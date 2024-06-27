import { memo } from 'react';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo(
    ({ className = '' }: FiltersContainerProps): JSX.Element => {
        const {
            order,
            sort,
            search,
            type,
            onChangeOrder,
            onChangeSort,
            onChangeSearch,
            onChangeType,
        } = useArticleFilters();
        return (
            <ArticlesFilters
                className={className}
                order={order}
                sort={sort}
                search={search}
                type={type}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
                onChangeSearch={onChangeSearch}
                onChangeType={onChangeType}
            />
        );
    },
);

FiltersContainer.displayName = 'FiltersContainer';
