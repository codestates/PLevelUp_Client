import { MouseEventHandler } from 'react';
import styles from '../../../../styles/pages/master/edit_page/EditPage.module.scss';
type EditActionButtonsType = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  isUpdate: boolean;
};

export default function EditActionButtons({
  onCancel,
  onConfirm,
  isUpdate,
}: EditActionButtonsType) {
  return (
    <div className={styles.masterEditWrapper}>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={onConfirm}>
          {isUpdate ? '수정' : '등록'}
        </button>
        <button className={styles.btn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
