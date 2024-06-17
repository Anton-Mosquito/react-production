import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/deprecated/Popups';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

const CountrySelect = memo(
    ({ className, value, onChange, readonly }: CountrySelectProps) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        return (
            <ListBox
                className={classNames('', {}, [className])}
                defaultValue={t('Укажите страну')}
                label={t('Укажите страну')}
                value={value}
                items={options}
                onChange={onChangeHandler}
                readonly={readonly}
                direction="top right"
            />
        );
    },
);

CountrySelect.displayName = 'CountrySelect';

export { CountrySelect };
