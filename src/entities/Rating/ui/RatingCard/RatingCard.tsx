import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedbackTitle?: string) => void;
    rate?: number;
}

export const RatingCard = memo(
    ({
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    }: RatingCardProps): JSX.Element => {
        const { t } = useTranslation();

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [starsCount, setStarsCount] = useState(rate);
        const [feedback, setFeedback] = useState('');

        const onSelectStars = useCallback(
            (selectedStarsCount: number) => {
                setStarsCount(selectedStarsCount);
                if (hasFeedback) {
                    setIsModalOpen(true);
                } else {
                    onAccept?.(selectedStarsCount);
                }
            },
            [hasFeedback, onAccept],
        );

        const acceptHandle = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount, feedback);
        }, [feedback, onAccept, starsCount]);

        const cancelHandle = useCallback(() => {
            setIsModalOpen(false);
            onCancel?.(starsCount);
        }, [onCancel, starsCount]);

        const modalContent = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <>
                        <Text title={feedbackTitle} />
                        <Input
                            data-testid="RatingCard.Input"
                            placeholder={t('Ваш отзив')}
                            value={feedback}
                            onChange={setFeedback}
                        />
                    </>
                }
                off={
                    <>
                        <TextDeprecated title={feedbackTitle} />
                        <InputDeprecated
                            data-testid="RatingCard.Input"
                            placeholder={t('Ваш отзив')}
                            value={feedback}
                            onChange={setFeedback}
                        />
                    </>
                }
            />
        );

        const content = (
            <>
                <VStack align="center" gap="8">
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                title={
                                    starsCount ? t('Спасибо за оценку!') : title
                                }
                            />
                        }
                        off={
                            <TextDeprecated
                                title={
                                    starsCount ? t('Спасибо за оценку!') : title
                                }
                            />
                        }
                    />
                    <StarRating
                        size={40}
                        selectedStars={starsCount}
                        onSelect={onSelectStars}
                    />
                </VStack>
                <BrowserView>
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack gap="32" max>
                            {modalContent}
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
                                    <HStack max gap="16" justify="end">
                                        <Button
                                            data-testid="RatingCard.Close"
                                            onClick={cancelHandle}
                                        >
                                            {t('Закрить')}
                                        </Button>
                                        <Button
                                            data-testid="RatingCard.Send"
                                            onClick={acceptHandle}
                                        >
                                            {t('Отправить')}
                                        </Button>
                                    </HStack>
                                }
                                off={
                                    <HStack max gap="16" justify="end">
                                        <ButtonDeprecated
                                            data-testid="RatingCard.Close"
                                            theme={ThemeButton.OUTLINE_RED}
                                            onClick={cancelHandle}
                                        >
                                            {t('Закрить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            data-testid="RatingCard.Send"
                                            onClick={acceptHandle}
                                        >
                                            {t('Отправить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                }
                            />
                        </VStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                        <VStack gap="32">
                            {modalContent}
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
                                    <Button
                                        onClick={acceptHandle}
                                        size="l"
                                        fullWidth
                                    >
                                        {t('Отправить')}
                                    </Button>
                                }
                                off={
                                    <ButtonDeprecated
                                        onClick={acceptHandle}
                                        size={ButtonSize.L}
                                        fullWidth
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                }
                            />
                        </VStack>
                    </Drawer>
                </MobileView>
            </>
        );

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" border="round" max>
                        {content}
                    </Card>
                }
                off={
                    <CardDeprecated
                        className={className}
                        max
                        data-testid="RatingCard"
                    >
                        {content}
                    </CardDeprecated>
                }
            />
        );
    },
);

RatingCard.displayName = 'RatingCard';
