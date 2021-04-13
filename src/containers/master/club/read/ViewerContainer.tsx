import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  masterClubReadThunk,
  masterClubUnloadRead,
  masterReadAsync,
} from '../../../../modules/master/club/read';
import { RootState } from '../../../../modules';
import Viewer from '../../../../components/master/club/read/Viewer';

export default withRouter(function ViewerContainer({ match }) {
  // 처음 마운트 될 떄 포스트 읽기 API 요청
  const { clubId } = match.params;
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    ({ masterReadAsync }: RootState) => ({
      data: masterReadAsync.club.data,
      error: masterReadAsync.club.error,
      loading: masterReadAsync.club.loading,
    }),
  );
  // 임시 조치 - 추후 문제 파악되면 수정 예정
  let club = data;
  let clubError = error;
  if (data && 'data' in data) {
    club = data['data'];
    clubError = data['data']['error'];
  }

  useEffect(() => {
    dispatch(masterClubReadThunk(clubId));
    // 언마운트 될 때 리덕스에서 포스트데이터 없애기
    return () => {
      dispatch(masterClubUnloadRead(''));
    };
  }, [dispatch, clubId]);

  return <Viewer club={club} loading={loading} error={clubError} />;
});
