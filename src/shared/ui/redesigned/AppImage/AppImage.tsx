import {
    type ImgHTMLAttributes,
    memo,
    useState,
    type ReactElement,
    useLayoutEffect,
} from 'react';

interface AppIMageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo(
    ({
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    }: AppIMageProps): JSX.Element => {
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);

        useLayoutEffect(() => {
            const img = new Image();
            img.src = src ?? '';
            img.onload = () => {
                setIsLoading(false);
            };
            img.onerror = () => {
                setIsLoading(false);
                setHasError(true);
            };
        }, [src]);

        if (isLoading && fallback) {
            return fallback;
        }

        if (hasError && errorFallback) {
            return errorFallback;
        }

        return (
            <img className={className} src={src} alt={alt} {...otherProps} />
        );
    },
);

AppImage.displayName = 'AppIMage';
