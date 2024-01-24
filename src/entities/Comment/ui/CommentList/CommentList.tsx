import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { useTranslation } from 'react-i18next'
import { type Comment } from '../../model/types/comments'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

const CommentList = memo(({ className, comments, isLoading }: CommentListProps): JSX.Element => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
        <CommentCard isLoading/>
      </div>
    )
  }
  return (
      <div className={classNames(cls.CommentList, {}, [className])}>
          { comments?.length
            ? comments.map((comment) =>
                <CommentCard
                    key={comment.id}
                    className={cls.comment}
                    comment={comment}
                    isLoading={isLoading}
                />
            )
            : <Text text={t('Коментарии отсутствуют')}/>
        }
      </div>
  )
})

CommentList.displayName = 'CommentList'

export { CommentList }
