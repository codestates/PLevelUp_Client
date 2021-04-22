import AskModal from '../../../common/AskModal';

type AskRemoveModalType = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AskRemoveModal({
  visible,
  onConfirm,
  onCancel,
}: AskRemoveModalType) {
  return (
    <AskModal
      visible={visible}
      title="클럽 삭제"
      description="클럽을 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
      children={null}
    />
  );
}
