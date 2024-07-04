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
import { HStack } from '../../Stack';
import { Text } from '../../Text';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
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
        label,
        size = 'm',
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

        const input = (
            <div
                className={classNames(cls.InputWrapper, mods, [
                    className,
                    cls[size],
                ])}
            >
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

        if (label) {
            return (
                <HStack max gap="8">
                    <Text text={label} />
                    {input}
                </HStack>
            );
        }

        return input;
    },
);

Input.displayName = 'Input';

export { Input };
