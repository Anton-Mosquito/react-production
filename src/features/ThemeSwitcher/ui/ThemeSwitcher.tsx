import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import ThemeIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon } from '@/shared/ui/deprecated/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

const ThemeSwitcher = memo(
    ({ className = '' }: ThemeSwitcherProps): JSX.Element => {
        const { theme, toggleTheme } = useTheme();
        const dispatch = useAppDispatch();
        const onToggleHandler = useCallback(() => {
            toggleTheme(newTheme => {
                dispatch(saveJsonSettings({ theme: newTheme }));
                // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
            });
        }, [dispatch, toggleTheme]);

        return (
            <Button
                theme={ThemeButton.CLEAR}
                className={classNames(cls.ThemeSwitcher, {}, [className])}
                onClick={onToggleHandler}
            >
                <Icon Svg={ThemeIcon} width={40} height={40} inverted/>
            </Button>
        );
    },
);

ThemeSwitcher.displayName = 'ThemeSwitcher';

export { ThemeSwitcher };
