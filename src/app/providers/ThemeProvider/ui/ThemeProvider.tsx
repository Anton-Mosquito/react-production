import { type ReactNode, useMemo, useState, useEffect } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
}

const ThemeProvider = ({
    children,
    initialTheme,
}: ThemeProviderProps): JSX.Element => {
    const { theme: defaultTheme } = useJsonSettings();
    const [isThemeInited, setIsThemeInited] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme ?? Theme.LIGHT);
    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

    useEffect(() => {
        if (!isThemeInited && (defaultTheme != null)) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
