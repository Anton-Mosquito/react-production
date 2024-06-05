import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlePagesFilters } from '../ArticlePagesFilters/ArticlePagesFilters';
import { useSearchParams } from 'react-router-dom';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { Page } from '@/widgets/Page';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';

export interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
                onScrollEnd={onLoadNextPart}
                data-testid="ArticlesPage"
            >
                <ArticlePagesFilters />
                <ArticleInfiniteList className={cls.list} />
                <ArticlePageGreeting />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
