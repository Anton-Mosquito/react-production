import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { type TFunction } from 'i18next/typescript/t';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

const LangSwitcher = memo(
    ({ className = '', short = false }: LangSwitcherProps): JSX.Element => {
        const { t, i18n } = useTranslation();
        const toggle = async (): Promise<TFunction<'translation', undefined>> =>
            await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button variant="clear">
                        {t(short ? 'короткий язик' : 'Язик')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        className={classNames(cls.LangSwitcher, {}, [
                            className,
                        ])}
                        theme={ThemeButton.CLEAR}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={toggle}
                    >
                        {t(short ? 'короткий язик' : 'Язик')}
                    </ButtonDeprecated>
                }
            />
        );
    },
);

LangSwitcher.displayName = 'LangSwitcher';

export { LangSwitcher };
