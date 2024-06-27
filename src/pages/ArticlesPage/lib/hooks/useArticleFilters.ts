import { useSelector } from 'react-redux';
import {
    getArticlesPageView,
    getArticlesPageSort,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageType,
} from '../../model/selectors/articlesPageSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    type ArticleView,
    type ArticleSortField,
    type ArticleType,
} from '@/entities/Article';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { type SortOrder } from '@/shared/types/sort';
import { useCallback } from 'react';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useArticleFilters() {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
            dispatch(articlesPageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder));
            dispatch(articlesPageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort));
            dispatch(articlesPageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search));
            dispatch(articlesPageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlesPageActions.setType(value));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,
    };
}
