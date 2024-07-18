import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';

export type TextVariant = 'primary' | 'inverted' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

const Text = memo(
    ({
        className,
        title = '',
        text = '',
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold = false,
        'data-testid': dataTestId = 'Text',
    }: TextProps): JSX.Element => {
        const HeaderTag = mapSizeToHeaderTag[size];
        const sizeClass = mapSizeToClass[size];
        return (
            <div
                className={classNames(cls.Text, { [cls.bold]: bold }, [
                    className,
                    cls[variant],
                    cls[align],
                    sizeClass,
                ])}
            >
                {Boolean(title) && (
                    <HeaderTag
                        className={cls.title}
                        data-testid={`${dataTestId}.Header`}
                    >
                        {title}
                    </HeaderTag>
                )}
                {Boolean(text) && (
                    <p
                        className={cls.text}
                        data-testid={`${dataTestId}.Paragraph`}
                    >
                        {text}
                    </p>
                )}
            </div>
        );
    },
);

Text.displayName = 'Text';

export { Text };
