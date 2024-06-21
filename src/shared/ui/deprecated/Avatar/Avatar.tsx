import { classNames, type Mods } from '@/shared/lib/classNames/classNames';
import { type CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
export const Avatar = ({
    className,
    src,
    size,
    alt,
    fallbackInverted,
}: AvatarProps): JSX.Element => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = (
        <Icon
            Svg={UserIcon}
            width={100}
            height={100}
            inverted={fallbackInverted}
        />
    );

    return (
        <AppImage
            className={classNames(cls.Avatar, mods, [className])}
            src={src}
            alt={alt}
            style={styles}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    );
};
