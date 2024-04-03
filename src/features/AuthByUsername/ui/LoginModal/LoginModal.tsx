import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal'
import { Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({
  className = '',
  isOpen = false,
  onClose
}: LoginModalProps): JSX.Element => {
  return (
      <Modal
          className={classNames('', {}, [className])}
          isOpen={isOpen}
          onClose={onClose}
          lazy
      >
          <Suspense fallback={<Loader/>}>
              <LoginFormAsync onSuccess={onClose}/>
          </Suspense>
      </Modal>
  )
}
