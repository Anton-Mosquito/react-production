import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { memo } from 'react';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = (): JSX.Element => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <HStack justify="center" max>
                <Avatar className={cls.avatar} size={200} src={article?.img} />
            </HStack>
            <VStack gap="4" max data-testid="ArticleDetails.Info">
                <TextDeprecated
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8">
                    <Icon Svg={EyeIcon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap="8">
                    <Icon Svg={CalendarIcon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const Redesigned = (): JSX.Element => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text title={article?.title} size="l" bold />
            <Text title={article?.subtitle} />
            <AppImage
                className={cls.img}
                src={article?.img}
                fallback={
                    <Skeleton width={'100%'} height={420} border="16px" />
                }
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const ArticleDetails = memo(
    ({ className, id }: ArticleDetailsProps): JSX.Element => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getArticleDetailsIsLoading);
        const error = useSelector(getArticleDetailsError);

        useInitialEffect(() => {
            dispatch(fetchArticleById(id)).catch(error => {
                console.error('Failed to fetch article by id:', error);
            });
        });

        let content;

        if (isLoading) {
            content = (
                <div>
                    <SkeletonDeprecated
                        className={cls.avatar}
                        width={200}
                        height={200}
                        border={'50%'}
                    />
                    <SkeletonDeprecated
                        className={cls.title}
                        width={300}
                        height={32}
                    />
                    <SkeletonDeprecated
                        className={cls.skeleton}
                        width={600}
                        height={24}
                    />
                    <SkeletonDeprecated
                        className={cls.skeleton}
                        width={'100%'}
                        height={200}
                    />
                    <SkeletonDeprecated
                        className={cls.skeleton}
                        width={'100%'}
                        height={200}
                    />
                </div>
            );
        } else if (error) {
            content = (
                <Text
                    align={TextAlign.CENTER}
                    text={t('Произошла ошибка при загрузке статьи')}
                />
            );
        } else {
            content = (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Redesigned />}
                    off={<Deprecated />}
                />
            );
        }

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
                <VStack
                    className={classNames(cls.ArticleDetails, {}, [className])}
                    gap="16"
                    max
                >
                    {content}
                </VStack>
            </DynamicModuleLoader>
        );
    },
);

ArticleDetails.displayName = 'ArticleDetails';

export { ArticleDetails };
