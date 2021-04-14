import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../modules';
import {
  mainClubReadThunk,
  mainClubUnloadRead,
} from '../../../modules/club/read';
import Viewer from '../../../components/club/read/Viewer';

export default withRouter(function ViewerContainer({ match, history }) {
  // 처음 마운트 될 떄 클럽 읽기 API 요청
  const { clubId } = match.params;
  const dispatch = useDispatch();
  const { data: club, error, loading } = useSelector(
    ({ mainReadAsync }: RootState) => ({
      data: mainReadAsync.club.data,
      error: mainReadAsync.club.error,
      loading: mainReadAsync.club.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainClubReadThunk(clubId));
    // 언마운트 될 때 리덕스에서 클럽데이터 없애기
    return () => {
      dispatch(mainClubUnloadRead());
    };
  }, []);

  return <Viewer club={club} loading={loading} error={error} />;
});
