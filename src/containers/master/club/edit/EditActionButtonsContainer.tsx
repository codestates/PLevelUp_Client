import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { masterClubWriteThunk } from '../../../../modules/master/club/edit';
import { withRouter } from 'react-router-dom';
import EditActionButtons from '../../../../components/master/club/edit/EditActionButtons';
import { RootState } from '../../../../modules';

export default withRouter(function EditActionButtonsContainer({ history }) {
  const dispatch = useDispatch();
  const {
    title,
    summary,
    place,
    price,
    description,
    topic,
    startDate,
    endDate,
    day,
    limitUserNumber,
    data: club,
    loading,
    error,
  } = useSelector(
    ({ masterEdit, masterEditAsync }: RootState) => ({
      title: masterEdit.title,
      summary: masterEdit.summary,
      place: masterEdit.place,
      price: masterEdit.price,
      description: masterEdit.description,
      topic: masterEdit.topic,
      startDate: masterEdit.startDate,
      endDate: masterEdit.endDate,
      day: masterEdit.day,
      limitUserNumber: masterEdit.limitUserNumber,
      data: masterEditAsync.club.data,
      loading: masterEditAsync.club.loading,
      error: masterEditAsync.club.error,
    }),
  );

  // 포스트 등록
  const onConfirm = () => {
    dispatch(masterClubWriteThunk({
      title,
      summary,
      place,
      price,
      description,
      topic,
      startDate,
      endDate,
      day,
      limitUserNumber,
    }));
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (club) {
      const { id, MasterId } = club;
      history.push(`/${MasterId}/${id}`);
    }
    if (error) {
      console.log(error);
    }
  }, [history, club, error]);

  return (
    <EditActionButtons
      onConfirm={onConfirm}
      onCancel={onCancel}
      isEdit={false}
    />
  );
});
