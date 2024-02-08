import { type HTMLAttributeAnchorTarget, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { useTranslation } from 'react-i18next'
import {
  ArticleView,
  type Article,
  ArticleBlockType,
  type ArticleTextBlock
} from '../../model/types/article'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { AppLink } from 'shared/ui/AppLink/AppLinks'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const ArticleListItem = memo(({ className, article, view, target }: ArticleListItemProps): JSX.Element => {
  const { t } = useTranslation()

  const types = <Text className={cls.types} text={article.type.join(', ')}/>
  const views = (
      <>
          <Text className={cls.views} text={String(article.views)}/>
          <Icon Svg={EyeIcon}/>
      </>
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks
      .find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.header}>
                    <Avatar src={article.user.avatar} size={30}/>
                    <Text text={article.user.username} className={cls.username}/>
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <Text title={article.title} className={cls.title}/>
                { types }
                <img src={article.img} alt={article.title} className={cls.img}/>
                { textBlock && (
                    <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>
                )}
                <div className={cls.footer}>
                    <AppLink
                        target={target}
                        to={RoutePath.article_details + article.id}
                    >
                        <Button theme={ThemeButton.OUTLINE}>
                            {t('Читать далее ....')}
                        </Button>
                    </AppLink>
                    { views }
                </div>
            </Card>
        </div>
    )
  }

  return (
      <AppLink
          target={target}
          className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
          to={RoutePath.article_details + article.id}
      >
          <Card className={cls.card}>
              <div className={cls.imageWrapper}>
                  <img src={article.img} className={cls.img} alt={article.title}/>
                  <Text className={cls.date} text={article.createdAt}/>
              </div>
              <div className={cls.infoWrapper}>
                  { types }
                  { views }
              </div>
              <Text text={article.title}/>
          </Card>
      </AppLink>
  )
})

ArticleListItem.displayName = 'ArticleListItem'

export { ArticleListItem }
