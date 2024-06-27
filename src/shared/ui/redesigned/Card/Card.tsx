import { type ReactNode, memo, type HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normal';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

const Card = memo(
    ({
        className,
        children,
        variant = 'normal',
        max,
        padding = '8',
        border = 'normal',
        ...otherProps
    }: CardProps): JSX.Element => {
        const paddingsClass = mapPaddingToClass[padding];
        return (
            <div
                className={classNames(cls.Card, { [cls.max]: max }, [
                    className,
                    cls[variant],
                    cls[paddingsClass],
                    cls[border],
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