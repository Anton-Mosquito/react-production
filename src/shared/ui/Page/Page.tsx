import { type ReactNode, memo, useRef, type MutableRefObject } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd: () => void
}

const Page = memo(({ className, children, onScrollEnd }: PageProps): JSX.Element => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd
  })
  return (
      <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
          { children }
          <div ref={triggerRef}/>
      </section>
  )
})

Page.displayName = 'Page'

export { Page }
