import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { masterClubWriteThunk } from '../../../../modules/master/club/edit';
import { withRouter } from 'react-router-dom';
import EditActionButtons from '../../../../components/master/club/edit/EditActionButtons';
import { RootState } from '../../../../modules';

export default withRouter(function EditActionButtonsContainer({ history }) {
  const dispatch = useDispatch();
  const { localClub, data: club, loading, error } = useSelector(
    ({ masterEdit, masterEditAsync }: RootState) => ({
      localClub: masterEdit.club,
      data: masterEditAsync.club.data,
      loading: masterEditAsync.club.loading,
      error: masterEditAsync.club.error,
    }),
  );

  // 포스트 등록
  const onConfirm = () => {
    dispatch(masterClubWriteThunk(localClub));
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
    if (error) {
      if (error.response?.status === 400) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
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
