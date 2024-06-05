import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer';

const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlePageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlePageWasOpened) {
            setIsOpen(true);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
        }
    }, [dispatch, isArticlePageWasOpened]);

    const onClose = (): void => {
        setIsOpen(false);
    };

    const text = (
        <Text
            title={t('Добро пожаловать на страницу статей')}
            text={t('Здесь ви можете просматривать статьи на различние теми')}
        />
    );

    if (isMobile) {
        return (
            <Drawer isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});

ArticlePageGreeting.displayName = 'ArticlePageGreeting';

export { ArticlePageGreeting };
