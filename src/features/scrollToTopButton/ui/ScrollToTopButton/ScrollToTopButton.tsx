import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './scrollToTopButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface scrollToTopButtonProps {
    className?: string;
}

const ScrollToTopButton = memo(
    ({ className = '' }: scrollToTopButtonProps): JSX.Element => {
        const onClick = (): void => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        return (
            <Icon
                className={classNames(cls.scrollToTopButton, {}, [className])}
                width={32}
                height={32}
                clickable
                onClick={onClick}
                Svg={CircleIcon}
            ></Icon>
        );
    },
);

ScrollToTopButton.displayName = 'scrollToTopButton';

export { ScrollToTopButton };
