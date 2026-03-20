import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modal-root')!;

export default function Modal({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}