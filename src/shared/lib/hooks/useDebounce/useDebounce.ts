import { type MutableRefObject, useCallback, useRef } from 'react';

/**
 * Debounces a callback function.
 *
 * @param callback - The callback function to be debounced.
 * @param delay - The delay in milliseconds before invoking the callback function.
 * @returns A debounced version of the callback function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(
    callback: (...args: any[]) => void,
    delay: number,
): () => void {
    const timer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                // eslint-disable-next-line n/no-callback-literal
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
