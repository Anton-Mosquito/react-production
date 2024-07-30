import { setFeatureFlags } from '@/shared/lib/features';
import { type FeatureFlags } from '@/shared/types/featureFlags';
import { type Decorator } from '@storybook/react';

export const FeaturesFlagsDecorator =
    (features: FeatureFlags): Decorator =>
    StoryComponent => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
