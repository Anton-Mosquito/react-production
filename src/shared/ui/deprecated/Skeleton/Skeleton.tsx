import { type CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}


/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
const Skeleton = memo(
    ({ className, height, width, border }: SkeletonProps): JSX.Element => {
        const styles: CSSProperties = {
            width,
            height,
            borderRadius: border,
        };

        return (
            <div
                className={classNames(cls.Skeleton, {}, [className])}
                style={styles}
            ></div>
        );
    },
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
