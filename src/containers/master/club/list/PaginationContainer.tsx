import { withRouter } from 'react-router-dom';
import Pagination from '../../../../components/master/club/list/Pagination';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { RootState } from '../../../../modules';

export default withRouter(function PaginationContainer({ location, match }) {
  const { lastPage, clubs, loading } = useSelector(
    ({ masterListAsync }: RootState) => ({
      lastPage: masterListAsync.lastPage,
      clubs: masterListAsync.clubs.data,
      loading: masterListAsync.clubs.loading,
    }),
  );

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!clubs || loading) return null;

  // page 가 없으면 1을 기본값으로 사용
  const { page = '1' } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination page={parseInt(page.toString(), 10)} lastPage={lastPage} />
  );
});
