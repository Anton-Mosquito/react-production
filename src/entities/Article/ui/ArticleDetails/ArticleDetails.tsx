import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import { useTranslation } from 'react-i18next'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { memo, useCallback, useEffect } from 'react'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails'
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import EyeIcon from 'shared/assets/icons/eye.svg'
import CalendarIcon from 'shared/assets/icons/calendar.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { ArticleBlockType, type ArticleBlock } from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import {
  ArticleImageBlockComponent
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

const ArticleDetails = memo(({ className, id }: ArticleDetailsProps): JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)
  const article = useSelector(getArticleDetailsData)

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block}/>
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block}/>
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block}/>
      default:
        return null
    }
  }, [])

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
        <div>
            <Skeleton className={cls.avatar} width={200} height={200} border={'50%'}/>
            <Skeleton className={cls.title} width={300} height={32}/>
            <Skeleton className={cls.skeleton} width={600} height={24}/>
            <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
            <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
        </div>
    )
  } else if (error) {
    content = (
        <Text
            align={TextAlign.CENTER}
            text={t('Произошла ошибка при загрузке статьи')}
        />
    )
  } else {
    content = (
        <>
            <div className={cls.avatarWrapper}>
                <Avatar
                    className={cls.avatar}
                    size={200}
                    src={article?.img}
                />
            </div>
            <Text
                className={cls.title}
                title={article?.title}
                text={article?.subtitle}
                size={TextSize.L}
            />
            <div className={cls.articleInfo}>
                <Icon className={cls.icon} Svg={EyeIcon}/>
                <Text text={String(article?.views)}/>
            </div>
            <div className={cls.articleInfo}>
                <Icon className={cls.icon} Svg={CalendarIcon}/>
                <Text text={article?.createdAt}/>
            </div>
            {article?.blocks.map(renderBlock)}
        </>
    )
  }

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
          <div className={classNames(cls.ArticleDetails, {}, [className])}>
              { content }
          </div>
      </DynamicModuleLoader>
  )
})

ArticleDetails.displayName = 'ArticleDetails'

export { ArticleDetails }