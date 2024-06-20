import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-dark.svg';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Icon
                        Svg={ThemeIconDeprecated}
                        clickable
                        onClick={onToggleHandler}
                    />
                }
                off={
                    <ButtonDeprecated
                        theme={ThemeButton.CLEAR}
                        className={classNames(cls.ThemeSwitcher, {}, [
                            className,
                        ])}
                        onClick={onToggleHandler}
                    >
                        <IconDeprecated
                            Svg={ThemeIconDeprecated}
                            width={40}
                            height={40}
                            inverted
                        />
                    </ButtonDeprecated>
                }
            />
        );
    },
);

ThemeSwitcher.displayName = 'ThemeSwitcher';

export { ThemeSwitcher };
