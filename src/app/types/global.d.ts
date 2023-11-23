declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  import type React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean
