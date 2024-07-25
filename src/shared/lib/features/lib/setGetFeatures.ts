import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localStorage';
import { type FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

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
