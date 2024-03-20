import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleTextBlockComponent.module.scss'
import { memo } from 'react'
import { Text } from '@/shared/ui/Text'
import { type ArticleTextBlock } from '../../model/types/article'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

const ArticleTextBlockComponent = memo(({
  className,
  block
}: ArticleTextBlockComponentProps): JSX.Element => {
  return (
      <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
          {block.title && (
              <Text className={cls.title} title={block.title}/>
          )}
          {block.paragraphs.map(paragraph => (
              <Text key={paragraph} className={cls.paragraph} text={paragraph}/>
          ))}
      </div>
  )
})

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent'

export { ArticleTextBlockComponent }
