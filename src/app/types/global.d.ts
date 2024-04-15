declare module '*.scss' {
    type IClassNames = Record<string, string>;
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.svg' {
    import type React from 'react';
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __API__: string;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
