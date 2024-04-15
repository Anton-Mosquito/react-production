import { render } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { type ReducersMapObject } from '@reduxjs/toolkit';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line custom-path-checker/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line custom-path-checker/layer-imports
import '@/app/styles/index.scss';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps): JSX.Element {
    const { children, options = {} } = props;
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState}
            >
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>{children}</div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function componentRender(
    component: ReactNode,
    options: componentRenderOptions = {},
) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
