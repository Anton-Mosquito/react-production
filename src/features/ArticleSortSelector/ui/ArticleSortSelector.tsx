import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { type SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

const ArticleSortSelector = memo(
    ({
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    }: ArticleSortSelectorProps): JSX.Element => {
        const { t } = useTranslation();
        const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(
            () => [
                {
                    value: 'asc',
                    content: t('возростанию'),
                },
                {
                    value: 'desc',
                    content: t('убиванию'),
                },
            ],
            [t],
        );

        const sortFieldOptions = useMemo<Array<SelectOption<ArticleSortField>>>(
            () => [
                {
                    value: ArticleSortField.CREATED,
                    content: t('дате создания'),
                },
                {
                    value: ArticleSortField.TITLE,
                    content: t('названию'),
                },
                {
                    value: ArticleSortField.VIEWS,
                    content: t('просмотрам'),
                },
            ],
            [t],
        );

        return (
            <div
                className={classNames(cls.ArticleSortSelector, {}, [className])}
            >
                <Select
                    label={t('Сортировать по')}
                    options={sortFieldOptions}
                    value={sort}
                    onChange={onChangeSort}
                />
                <Select
                    className={cls.order}
                    label={t('по')}
                    options={orderOptions}
                    value={order}
                    onChange={onChangeOrder}
                />
            </div>
        );
    },
);

ArticleSortSelector.displayName = 'ArticleSortSelector';

export { ArticleSortSelector };
