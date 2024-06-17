import { type ReactNode, memo, type HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
const Card = memo(
    ({
        className,
        children,
        theme = CardTheme.NORMAL,
        max,
        ...otherProps
    }: CardProps): JSX.Element => {
        return (
            <div
                className={classNames(cls.Card, { [cls.max]: max }, [
                    className,
                    cls[theme],
                ])}
                {...otherProps}
            >
                {children}
            </div>
        );
    },
);

Card.displayName = 'Card';

export { Card };
