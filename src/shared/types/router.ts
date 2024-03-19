// eslint-disable-next-line custom-path-checker/layer-imports
import { type UserRole } from '@/entities/User'
import { type RouteProps } from 'react-router-dom'

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
