import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import type { ReactNode } from 'react';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals')!;

type TModalProps = {
  children: ReactNode;
  title?: string;
  onClose: () => void;
};

export const Modal = ({ children, title, onClose }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent): void {
      event.key === 'Escape' && onClose();
    }

    document.addEventListener('keydown', handleEscape);

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <header className={styles.header}>
          <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Закрыть модальное окно"
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </header>
        {children}
      </div>
    </>,
    modalRoot
  );
};
