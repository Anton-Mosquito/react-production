import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginModal.module.scss'
import { Modal } from 'shared/ui/Modal'
import { LoginForm } from '../LoginForm/LoginForm'

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
          className={classNames(cls.LoginModal, {}, [className])}
          isOpen={isOpen}
          onClose={onClose}
          lazy
      >
          <LoginForm/>
      </Modal>
  )
}
