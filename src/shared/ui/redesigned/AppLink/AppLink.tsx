import { type ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { NavLink, type LinkProps } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
}

const AppLink = memo(
    ({
        to,
        className = '',
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    }: AppLinkProps) => {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    classNames(cls.AppLink, { [activeClassName]: isActive }, [
                        className,
                        cls[variant],
                    ])
                }
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    },
);

AppLink.displayName = 'AppLink';

export { AppLink };
