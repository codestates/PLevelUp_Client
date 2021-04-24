import styles from '../../styles/common/Modal.module.scss';
import { ReactNode } from 'react';

type AskModalType = {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

export default function AskModal({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  children,
}: AskModalType) {
  if (!visible) return null;

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.fullscreen}>
        <div className={styles.askModalWrapper}>
          <h2>{title}</h2>
          {children}
          <span>{description}</span>
          <div className={styles.buttons}>
            <button className={styles.cancelBtn} onClick={onCancel}>
              {cancelText}
            </button>
            <button className={styles.confirmBtn} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
