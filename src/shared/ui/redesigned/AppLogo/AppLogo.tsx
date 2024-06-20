import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../../deprecated/Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

const AppLogo = memo(
    ({ className = '', size = 50 }: AppLogoProps): JSX.Element => {
        return (
            <HStack
                className={classNames(cls.appLogoWrapper, {}, [className])}
                max
                justify="center"
            >
                <div className={cls.gradientBig}></div>
                <div className={cls.gradientSmall}></div>
                <AppSvg
                    width={size}
                    height={size}
                    color="black"
                    className={cls.appLogo}
                />
            </HStack>
        );
    },
);

AppLogo.displayName = 'AppLogo';

export { AppLogo };