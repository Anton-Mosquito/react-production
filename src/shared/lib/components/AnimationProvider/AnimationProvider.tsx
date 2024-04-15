import {
    type ReactNode,
    createContext,
    memo,
    useRef,
    useState,
    useEffect,
    useMemo,
    useContext,
} from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type SpringType = typeof import('@react-spring/web');
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Both lib depends on from each others
const getAsyncAnimationModules = async (): Promise<
    [SpringType, GestureType]
> => {
    return await Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};

export const useAnimationLibs = (): AnimationContextPayload => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = memo(
    ({ children }: { children: ReactNode }): JSX.Element => {
        const SpringRef = useRef<SpringType>();
        const GestureRef = useRef<GestureType>();
        const [isLoaded, setIsLoaded] = useState(false);

        useEffect(() => {
            const fetchModules = async (): Promise<void> => {
                try {
                    const [Spring, Gesture] = await getAsyncAnimationModules();
                    SpringRef.current = Spring;
                    GestureRef.current = Gesture;
                    setIsLoaded(true);
                } catch (error) {
                    console.error(
                        'Error fetching async animation modules:',
                        error,
                    );
                }
            };

            fetchModules().catch(error => {
                console.error('Uncaught error in fetchModules:', error);
            });
        }, []);

        const value = useMemo(
            () => ({
                Gesture: GestureRef.current,
                Spring: SpringRef.current,
                isLoaded,
            }),
            [isLoaded],
        );
        return (
            <AnimationContext.Provider value={value}>
                {children}
            </AnimationContext.Provider>
        );
    },
);

AnimationProvider.displayName = 'AnimationProvider';
