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
  } = useSelector(({ masterEdit, masterEditAsync }: RootState) => ({
    title: masterEdit.club.title,
    summary: masterEdit.club.summary,
    place: masterEdit.club.place,
    price: masterEdit.club.price,
    description: masterEdit.club.description,
    topic: masterEdit.club.topic,
    startDate: masterEdit.club.startDate,
    endDate: masterEdit.club.endDate,
    day: masterEdit.club.day,
    limitUserNumber: masterEdit.club.limitUserNumber,
    data: masterEditAsync.club.data,
    loading: masterEditAsync.club.loading,
    error: masterEditAsync.club.error,
  }));

  // 포스트 등록
  const onConfirm = () => {
    dispatch(
      masterClubWriteThunk({
        id: null,
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
      }),
    );
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (club) {
      const { id } = club;
      console.log('등록 성공');
      history.push(`/master/${id}`);
    }
    // if (error) {
    //   if (error.response?.status === 400) {
    //     console.log(error.response.data);
    //   } else {
    //     console.log(error);
    //   }
    // }
  }, [history, club, error]);

  return (
    <EditActionButtons
      onConfirm={onConfirm}
      onCancel={onCancel}
      isEdit={false}
    />
  );
});
