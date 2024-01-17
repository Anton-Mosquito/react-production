import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleCodeBlockComponent.module.scss'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { type ArticleCodeBlock } from '../../model/types/article'
import { Code } from 'shared/ui/Code/Code'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

const ArticleCodeBlockComponent = memo(({
  className,
  block
}: ArticleCodeBlockComponentProps): JSX.Element => {
  const { t } = useTranslation()
  return (
      <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
          <Code text= {block.code}/>
      </div>
  )
})

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent'

export { ArticleCodeBlockComponent }