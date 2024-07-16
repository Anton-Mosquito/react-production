import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { Text } from '@/shared/ui/redesigned/Text';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo(({ className }: SettingsPageProps) => {
    return (
        <Page className={className}>
            <VStack gap="16">
                <Text title={'Настройки пользователя'} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
