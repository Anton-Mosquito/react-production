import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { type Comment } from '../../model/types/comments'
import { Avatar } from '@/shared/ui/Avatar'
import { Text } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { AppLink } from '@/shared/ui/AppLink'
import { VStack } from '@/shared/ui/Stack'
import { getRouteProfile } from '@/shared/const/router'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps): JSX.Element => {
  if (isLoading) {
    return (
        <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
            <div className={cls.header}>
                <Skeleton width={30} height={30} border='50%'/>
                <Skeleton className={cls.username} height={16} width={100} />
            </div>
            <Skeleton className={cls.text} width='100%' height={50}/>
        </VStack>
    )
  }

  if (!comment) {
    return (<></>)
  }

  return (
      <VStack
          className={classNames(cls.CommentCard, {}, [className])}
          gap='8'
          max
      >
          <AppLink className={cls.header} to={getRouteProfile(comment.user.id)}>
              {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar}/> : null}
              <Text className={cls.username} title={comment.user.username}/>
          </AppLink>
          <Text className={cls.text}/>
      </VStack>
  )
})

CommentCard.displayName = 'CommentCard'

export { CommentCard }
