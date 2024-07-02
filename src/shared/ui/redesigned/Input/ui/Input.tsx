import { type Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import {
    memo,
    type InputHTMLAttributes,
    useState,
    useEffect,
    useRef,
    type ReactNode,
} from 'react';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

const Input = memo(
    ({
        className = '',
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        ...otherProps
    }: InputProps): JSX.Element => {
        const ref = useRef<HTMLInputElement>(null);
        const [isFocused, setIsFocused] = useState(false);

        useEffect(() => {
            if (autofocus) {
                setIsFocused(true);
                ref.current?.focus();
            }
        }, [autofocus]);

        const onChangeHandler = (
            e: React.ChangeEvent<HTMLInputElement>,
        ): void => {
            onChange?.(e.target.value);
        };

        const onBlur = (): void => {
            setIsFocused(false);
        };

        const onFocus = (): void => {
            setIsFocused(true);
        };

        const mods: Mods = {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
            [cls.withAddonLeft]: Boolean(addonLeft),
            [cls.withAddonRight]: Boolean(addonRight),
        };

        return (
            <div className={classNames(cls.InputWrapper, mods, [className])}>
                <div className={cls.addonLeft}>{addonLeft}</div>
                <input
                    ref={ref}
                    className={cls.input}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    readOnly={readonly}
                    placeholder={placeholder}
                    {...otherProps}
                />
                <div className={cls.addonRight}>{addonRight}</div>
            </div>
        );
    },
);

Input.displayName = 'Input';

export { Input };
