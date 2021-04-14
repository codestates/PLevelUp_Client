import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../modules';
import List from '../../../components/club/list/List';
import { mainListThunk } from '../../../modules/club/list';

export default withRouter(function ListContainer({ location, match }) {
  const dispatch = useDispatch();
  const { clubs, error, loading } = useSelector(
    ({ mainListAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data,
      error: mainListAsync.clubs.error,
      loading: mainListAsync.clubs.loading,
    }),
  );

  useEffect(() => {
    let { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    page = page || '';
    dispatch(mainListThunk({ page: page.toString() }));
  }, [dispatch, location.search]);

  return <List loading={loading} error={error} clubs={clubs} />;
});
