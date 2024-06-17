import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
const Icon = memo(
    ({ className, Svg, inverted, ...otherProps }: IconProps): JSX.Element => {
        return (
            <Svg
                className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                    className,
                ])}
                {...otherProps}
            />
        );
    },
);

Icon.displayName = 'Icon';

export { Icon };
