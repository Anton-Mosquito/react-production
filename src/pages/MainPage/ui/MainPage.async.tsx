import { type FC, lazy } from 'react'

export const MainPageAsync = lazy<FC>(async () =>
  await new Promise((resolve) => {
    setTimeout(() => { resolve(import('./MainPage')) }, 1500)
  }))
