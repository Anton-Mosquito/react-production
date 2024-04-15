import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle(
    callback: (...args: any[]) => void,
    delay: number,
): () => void {
    const throttleRef = useRef(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useCallback(
        (...args: any[]) => {
            if (throttleRef.current) return;
            // eslint-disable-next-line n/no-callback-literal
            callback(...args);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        },
        [callback, delay],
    );
}
