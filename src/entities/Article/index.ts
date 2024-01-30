export { type Article, ArticleView } from './model/types/article'
export { type ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'

export {
  articleDetailsActions,
  articleDetailsReducer
} from './model/slice/articleDetailsSlice'

export { ArticleList } from './ui/ArticleList/ArticleList'
export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector'
