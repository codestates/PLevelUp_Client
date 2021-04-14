import { MouseEventHandler } from 'react';

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
    <>
      <button onClick={onConfirm}>{isUpdate ? '수정' : '등록'}</button>
      <button onClick={onCancel}>취소</button>
    </>
  );
}
