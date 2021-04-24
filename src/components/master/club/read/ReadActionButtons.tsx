import styles from '../../../../styles/pages/master/read_page/ReadPage.module.scss';
import { useState } from 'react';
import AskRemoveModal from './AskRemoveModal';

type ReadActionButtonsType = {
  onUpdate: () => void;
  onRemove: () => void;
};

export default function ReadActionButtons({
  onUpdate,
  onRemove,
}: ReadActionButtonsType) {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <button className={styles.fixedAppBtn1} onClick={onUpdate}>
        수정
      </button>
      <div className={styles.removeBtn}>
        <button className={styles.fixedAppBtn2} onClick={onRemoveClick}>
          삭제
        </button>
      </div>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
}
