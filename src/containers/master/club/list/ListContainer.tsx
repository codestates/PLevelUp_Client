import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import qs from 'qs';
import List from '../../../../components/master/club/list/List';
import { withRouter } from 'react-router-dom';
import { masterListThunk } from '../../../../modules/master/club/list';
import { RootState } from '../../../../modules';

export default withRouter(function ListContainer({ location, match }) {
  const dispatch = useDispatch();
  const { clubs, error, loading, master } = useSelector(
    ({ masterListAsync, masterUser }: RootState) => ({
      clubs: masterListAsync.clubs.data,
      error: masterListAsync.clubs.error,
      loading: masterListAsync.clubs.loading,
      master: masterUser.user?.data,
    }),
  );

  useEffect(() => {
    let { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    page = page || '';
    dispatch(masterListThunk({ page: page.toString() }));
  }, [dispatch, location.search]);
  return (
    <List
      loading={loading}
      error={error}
      clubs={clubs}
      isMasterLogged={!!master}
    />
  );
});
