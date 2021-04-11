import { MouseEventHandler } from 'react';

type EditActionButtonsType = {
  onCancel : MouseEventHandler<HTMLButtonElement>;
  onConfirm : MouseEventHandler<HTMLButtonElement>;
  isEdit: boolean;
}

export default function EditActionButtons({ onCancel, onConfirm, isEdit }: EditActionButtonsType) {
  return (
    <>
      <button onClick={onConfirm}>{isEdit ? '수정' : '등록'}</button>
      <button onClick={onCancel}>취소</button>
    </>
  );
}
