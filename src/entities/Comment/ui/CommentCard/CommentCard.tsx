import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { useTranslation } from 'react-i18next'
import { type Comment } from '../../model/types/comments'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface CommentCardProps {
  className?: string
  comment: Comment
  isLoading?: boolean
}

const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps): JSX.Element => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.header}>
                <Skeleton width={30} height={30} border='50%'/>
                <Skeleton className={cls.username} height={16} width={100} />
            </div>
            <Skeleton className={cls.text} width='100%' height={50}/>
        </div>
    )
  }

  return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
          <div className={cls.header}>
              {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar}/> : null}
              <Text className={cls.username} title={comment.user.username}/>
          </div>
          <Text className={cls.text} text={comment.text}/>
      </div>
  )
})

CommentCard.displayName = 'CommentCard'

export { CommentCard }
