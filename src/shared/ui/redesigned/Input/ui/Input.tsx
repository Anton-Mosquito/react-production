import { type Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import {
    memo,
    type InputHTMLAttributes,
    useState,
    useEffect,
    useRef,
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
        ...otherProps
    }: InputProps): JSX.Element => {
        const ref = useRef<HTMLInputElement>(null);
        const [isFocused, setIsFocused] = useState(false);
        const [caretPosition, setCaretPosition] = useState(0);
        const isCaretVisible = isFocused && !readonly;

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
            setCaretPosition(e.target.value.length);
        };

        const onBlur = (): void => {
            setIsFocused(false);
        };

        const onFocus = (): void => {
            setIsFocused(true);
        };

        const onSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
            setCaretPosition(e.target.selectionStart ?? 0);
        };

        const mods: Mods = {
            [cls.readonly]: readonly,
        };

        return (
            <div className={classNames(cls.InputWrapper, mods, [className])}>
                {Boolean(placeholder) && (
                    <div className={cls.placeholder}>{`${placeholder}>`}</div>
                )}
                <div className={cls.caretWrapper}>
                    <input
                        ref={ref}
                        className={cls.input}
                        type={type}
                        value={value}
                        onChange={onChangeHandler}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSelect={onSelect}
                        readOnly={readonly}
                        {...otherProps}
                    />
                    {isCaretVisible && (
                        <span
                            className={cls.caret}
                            style={{ left: `${caretPosition * 9}px` }}
                        />
                    )}
                </div>
            </div>
        );
    },
);

Input.displayName = 'Input';

export { Input };
