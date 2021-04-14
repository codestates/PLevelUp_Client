import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../modules';
import ClubList from '../../../components/club/list/ClubList';

import { mainListThunk } from '../../../modules/club/list';

export default withRouter(function ListContainer({ location }) {
  const dispatch = useDispatch();
  const { clubs, error, loading } = useSelector(
    ({ mainListAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data, // 모든 클럽데이터들
      error: mainListAsync.clubs.error,
      loading: mainListAsync.clubs.loading,
    }),
  );
  const bookmark = null;
  useEffect(() => {
    dispatch(mainListThunk({ page: 1 }));
  }, [dispatch, location.search]);

  return (
    <ClubList
      loading={loading}
      error={error}
      clubs={clubs}
      bookmark={bookmark}
    />
  );
});
