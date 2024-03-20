import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { StarRating } from '@/shared/ui/StarRating'
import { Modal } from '@/shared/ui/Modal'
import { Input } from '@/shared/ui/Input'
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button'
import { BrowserView, MobileView } from 'react-device-detect'
import { Drawer } from '@/shared/ui/Drawer'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedbackTitle?: string) => void
  rate?: number
}

export const RatingCard = memo(({
  className,
  title,
  feedbackTitle,
  hasFeedback,
  onCancel,
  onAccept,
  rate = 0
}: RatingCardProps): JSX.Element => {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
      <>
          <Text title={feedbackTitle}/>
          <Input
              placeholder={t('Ваш отзив')}
              value={feedback}
              onChange={setFeedback}
          />
      </>

  )

  return (
      <Card className={className} max>
          <VStack align='center' gap='8'>
              <Text title={starsCount ? t('Спасибо за оценку!') : title}/>
              <StarRating
                  size={40}
                  selectedStars={starsCount}
                  onSelect={onSelectStars}
              />
          </VStack>
          <BrowserView>
              <Modal isOpen={isModalOpen} lazy>
                  <VStack gap='32' max>
                      {modalContent}
                      <HStack max gap='16' justify='end'>
                          <Button theme={ThemeButton.OUTLINE_RED} onClick={cancelHandle}>
                              {t('Закрить')}
                          </Button>
                          <Button onClick={acceptHandle}>
                              {t('Отправить')}
                          </Button>
                      </HStack>
                  </VStack>
              </Modal>
          </BrowserView>
          <MobileView>
              <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                  <VStack gap='32'>
                      {modalContent}
                      <Button onClick={acceptHandle} size={ButtonSize.L} fullWidth>
                          {t('Отправить')}
                      </Button>
                  </VStack>
              </Drawer>
          </MobileView>
      </Card>
  )
})

RatingCard.displayName = 'RatingCard'
