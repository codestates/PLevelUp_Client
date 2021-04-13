import styles from '../../styles/common/Modal.module.scss';

type AskModalType = {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AskModal({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: AskModalType) {
  if (!visible) return null;

  return (
    <div className={styles.fullscreen}>
      <div className={styles.modalWrapper}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
