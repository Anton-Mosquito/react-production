import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { memo } from 'react'
import { type ArticleImageBlock } from '../../model/types/article'
import { Text, TextAlign } from '@/shared/ui/Text'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

const ArticleImageBlockComponent = memo(({
  className,
  block
}: ArticleImageBlockComponentProps): JSX.Element => {
  return (
      <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
          <img src={block.src} className={cls.img} alt={block.title} />
          {block.title && (
          <Text text={block.title} align={TextAlign.CENTER}/>
          )}
      </div>
  )
})

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent'

export { ArticleImageBlockComponent }
