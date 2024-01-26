import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { ArticleView } from '../../model/types/article'
import { Card } from 'shared/ui/Card/Card'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleView
}

const ArticleListItemSkeleton = memo(({
  className,
  view
}: ArticleListItemSkeletonProps): JSX.Element => {
  if (view === ArticleView.BIG) {
    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.header}>
                    <Skeleton height={30} width={30} border={'50%'}/>
                    <Skeleton width={150} height={16} className={cls.username}/>
                    <Skeleton width={150} height={16} className={cls.date}/>
                </div>
                <Skeleton className={cls.title} width={250} height={24}/>
                <Skeleton className={cls.img} height={250}/>
                <div className={cls.footer}>
                    <Skeleton height={36} width={200}/>
                </div>
            </Card>
        </div>
    )
  }

  return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
          <Card className={cls.card}>
              <div className={cls.imageWrapper}>
                  <Skeleton className={cls.img} width={200} height={200}/>
              </div>
              <div className={cls.infoWrapper}>
                  <Skeleton width={130} height={16}/>
              </div>
              <Skeleton width={150} height={16} className={cls.title}/>
          </Card>
      </div>
  )
})

ArticleListItemSkeleton.displayName = 'ArticleListItemSkeleton'

export { ArticleListItemSkeleton }
