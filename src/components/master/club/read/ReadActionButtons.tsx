type ReadActionButtonsType = {
  onUpdate: () => void;
};

export default function ReadActionButtons({ onUpdate }: ReadActionButtonsType) {
  return (
    <>
      <button onClick={onUpdate}>수정</button>
      <button>삭제</button>
    </>
  );
}
