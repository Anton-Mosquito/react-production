import { type ReactNode, memo, type ButtonHTMLAttributes } from 'react';
import { type Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
}

const Button = memo(
    ({
        className = '',
        children,
        variant = 'outline',
        square,
        size = 'm',
        disabled,
        fullWidth,
        ...otherProps
    }: ButtonProps) => {
        const mods: Mods = {
            [cls.square]: square,
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
        };

        return (
            <button
                type="button"
                className={classNames(cls.Button, mods, [
                    cls[variant],
                    cls[size],
                    className,
                ])}
                disabled={disabled}
                {...otherProps}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';

export { Button };
