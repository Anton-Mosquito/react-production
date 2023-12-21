import { type FC, lazy } from 'react'
import { type ProfilePageProps } from './ProfilePage'

export const ProfilePageAsync = lazy<FC<ProfilePageProps>>(async () =>
  await new Promise((resolve) => {
    setTimeout(() => { resolve(import('./ProfilePage')) }, 1500)
  }))
