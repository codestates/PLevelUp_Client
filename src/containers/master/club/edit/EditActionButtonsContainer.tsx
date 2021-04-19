import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  masterClubUnloadEdit,
  masterClubUpdateThunk,
  masterClubWriteThunk,
} from '../../../../modules/master/club/edit';
import { withRouter } from 'react-router-dom';
import EditActionButtons from '../../../../components/master/club/edit/EditActionButtons';
import { RootState } from '../../../../modules';

export default withRouter(function EditActionButtonsContainer({ history }) {
  const dispatch = useDispatch();
  const { data: club, loading, error } = useSelector(
    ({ masterEditAsync }: RootState) => ({
      data: masterEditAsync.club.data,
      loading: masterEditAsync.club.loading,
      error: masterEditAsync.club.error,
    }),
  );

  const { localClub } = useSelector(({ masterEdit }: RootState) => ({
    localClub: masterEdit.club,
  }));

  // 포스트 등록
  const onConfirm = () => {
    if (localClub.id) {
      dispatch(masterClubUpdateThunk(localClub));
      return;
    }
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
      // console.log('등록 or 수정 성공');
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

  // 언마운트 될때 club 초기화
  useEffect(
    () => () => {
      dispatch(masterClubUnloadEdit());
    },
    [],
  );

  return (
    <EditActionButtons
      onConfirm={onConfirm}
      onCancel={onCancel}
      isUpdate={!!localClub.id}
    />
  );
});
