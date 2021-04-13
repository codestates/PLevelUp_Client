import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  masterClubReadThunk,
  masterClubUnloadRead,
} from '../../../../modules/master/club/read';
import { RootState } from '../../../../modules';
import Viewer from '../../../../components/master/club/read/Viewer';
import ReadActionButtons from '../../../../components/master/club/read/ReadActionButtons';
import { masterEditSetOriginalClub } from '../../../../modules/master/club/edit';

export default withRouter(function ViewerContainer({ match, history }) {
  // 처음 마운트 될 떄 포스트 읽기 API 요청
  const { clubId } = match.params;
  const dispatch = useDispatch();
  const { data: club, error, loading } = useSelector(
    ({ masterReadAsync }: RootState) => ({
      data: masterReadAsync.club.data,
      error: masterReadAsync.club.error,
      loading: masterReadAsync.club.loading,
    }),
  );

  useEffect(() => {
    dispatch(masterClubReadThunk(clubId));
    // 언마운트 될 때 리덕스에서 포스트데이터 없애기
    return () => {
      dispatch(masterClubUnloadRead(''));
    };
  }, [dispatch, clubId]);

  return (
    <Viewer
      club={club}
      loading={loading}
      error={error}
      actionButtons={<ReadActionButtons />}
    />
  );
});
