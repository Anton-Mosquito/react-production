import { type FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags = {};

// context
// state
// reload page
// crutch
export function setFeatureFlags(newFeatureFlags?: FeatureFlags): void {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags ?? {};
    }
}

export function getFeatureFlags(flag: keyof FeatureFlags): boolean | undefined {
    return featureFlags?.[flag];
}

export function getAllFeatureFlags(): FeatureFlags {
    return featureFlags;
}
