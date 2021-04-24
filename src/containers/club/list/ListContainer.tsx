import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../modules';
import List from '../../../components/club/list/List';
import { mainClubUnloadList, mainListThunk } from '../../../modules/club/list';
import { MainClubListResType } from '../../../api/main/club';
import styles from '../../../styles/pages/list_page/ListPage.module.scss';
import { FaArrowCircleUp } from 'react-icons/fa';
import Search from '../../../components/club/list/Search';
import qs from 'qs';
import ErrorView from '../../../components/common/ErrorView';
import Loading from '../../../components/common/Loading';

export default withRouter(function ListContainer({ location, match, history }) {
  const loader = useRef<any>(null);
  const [page, setPage] = useState<number>(1);
  const [goToTop, setGoToTop] = useState(false);
  const [currentClubs, setCurrentClubs] = useState<MainClubListResType>([]);
  const dispatch = useDispatch();
  const { clubs, error, loading, lastPage } = useSelector(
    ({ mainListAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data,
      error: mainListAsync.clubs.error,
      loading: mainListAsync.clubs.loading,
      lastPage: mainListAsync.lastPage,
    }),
  );

  const {
    search = null,
    place = null,
    day = null,
    filter = null,
    limitNumber = null,
  } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const handleSearch = (
    search?: string,
    place?: string,
    day?: string,
    filter?: string,
    limitNumber?: string,
  ) => {
    const query = qs.stringify({ search, place, day, filter, limitNumber });
    history.push(`/club?${query}`);
    // window.location.reload();
    dispatch(mainClubUnloadList());
    setCurrentClubs([]);
    dispatch(
      mainListThunk({
        page: 1,
        search: search?.toString(),
        place: place?.toString(),
        day: day?.toString(),
        filter: filter?.toString(),
        limitNumber: limitNumber?.toString(),
      }),
    );
    setPage(2);
  };

  const onSearch = (search: string) => {
    handleSearch(
      search?.toString(),
      place?.toString(),
      day?.toString(),
      filter?.toString(),
      limitNumber?.toString(),
    );
  };

  const onPlace = (place: string | null) => {
    handleSearch(
      search?.toString(),
      place?.toString(),
      day?.toString(),
      filter?.toString(),
      limitNumber?.toString(),
    );
  };

  const onDay = (day: string | null) => {
    handleSearch(
      search?.toString(),
      place?.toString(),
      day?.toString(),
      filter?.toString(),
      limitNumber?.toString(),
    );
  };

  const onFilter = (filter: string | null) => {
    handleSearch(
      search?.toString(),
      place?.toString(),
      day?.toString(),
      filter?.toString(),
      limitNumber?.toString(),
    );
  };

  const onLimitNumber = (limitNumber: string | null) => {
    handleSearch(
      search?.toString(),
      place?.toString(),
      day?.toString(),
      filter?.toString(),
      limitNumber?.toString(),
    );
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!loading && clubs) {
        setCurrentClubs(currentClubs.concat(clubs));
        dispatch(mainClubUnloadList());
      }
      if (entries[0].isIntersecting && !loading) {
        if (lastPage >= page) {
          dispatch(
            mainListThunk({
              page: page,
              search: search?.toString(),
              place: place?.toString(),
              day: day?.toString(),
              filter: filter?.toString(),
              limitNumber: limitNumber?.toString(),
            }),
          );
          setPage(page + 1);
        } else {
          setGoToTop(true);
        }
      }
    },
    [page, clubs],
  );

  useEffect(() => {
    // 여기서 lastPage === 0 인 경우는 이전에 리스트 없는 조건까지 검색하고
    // 이동 후 다시 돌아왔을 때이다.
    if (lastPage >= page || lastPage === 0) {
      dispatch(
        mainListThunk({
          page: page,
          search: search?.toString(),
          place: place?.toString(),
          day: day?.toString(),
          filter: filter?.toString(),
          limitNumber: limitNumber?.toString(),
        }),
      );
      setPage(page + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });
    observer.observe(loader.current);

    return () => observer && observer.disconnect();
  }, [handleObserver]);
  return (
    <>
      <Search
        onSearch={onSearch}
        onPlace={onPlace}
        onDay={onDay}
        onFilter={onFilter}
        onLimitNumber={onLimitNumber}
      />
      {error ? (
        <div ref={loader}>
          <ErrorView />
        </div>
      ) : lastPage === 0 ? (
        <ErrorView
          children={<div ref={loader}>리스트가 없습니다.</div>}
          isGoMainBtn={false}
        />
      ) : (
        <>
          <List clubs={currentClubs} />
          <div ref={loader} className={styles.loading}>
            {loading && <Loading />}
            {goToTop && lastPage > 1 && (
              <div
                className={styles.goToTop}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <FaArrowCircleUp className={styles.icon} size={64} />
              </div>
            )}
          </div>
          <div style={{ minHeight: '50px' }} />
        </>
      )}
    </>
  );
});
