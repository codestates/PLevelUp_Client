import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { RootState } from '../../../modules';
import List from '../../../components/club/list/List';
import { mainClubUnloadList, mainListThunk } from '../../../modules/club/list';
import { mainClubBookmarkUnload } from '../../../modules/club/bookmark';
import {
  MainClubListResType,
  MainClubReadResType,
} from '../../../api/main/club';
import styles from '../../../styles/pages/list_page/ListPage.module.scss';
import loadingGif from '../../../asset/loading.gif';
import { FaArrowCircleUp } from 'react-icons/fa';
import Search from '../../../components/club/list/Search';
import qs from 'qs';
import ErrorView from '../../../components/common/ErrorView';
import LoadingView from '../../../components/common/LoadingView';

export default withRouter(function ListContainer({ location, match, history }) {
  const loader = useRef<any>(null);
  const [page, setPage] = useState<number>(1);
  const [goToTop, setGoToTop] = useState(false);
  const [currentClubs, setCurrentClubs] = useState<MainClubListResType>([]);
  const dispatch = useDispatch();
  const { clubs, error, loading, lastPage, bookmark } = useSelector(
    ({ mainListAsync, mainBookmarkAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data,
      error: mainListAsync.clubs.error,
      loading: mainListAsync.clubs.loading,
      lastPage: mainListAsync.lastPage,
      bookmark: mainBookmarkAsync.bookmark.data,
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

  const newCurrentClubs = currentClubs.map((club: MainClubReadResType) =>
    club.id === bookmark?.clubId
      ? {
          ...club,
          isBookmark: bookmark.isBookmark,
        }
      : club,
  );
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

  useEffect(() => {
    setCurrentClubs(newCurrentClubs);
    dispatch(mainClubBookmarkUnload());
  }, [bookmark]);

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
    if (lastPage >= page) {
      dispatch(
        mainListThunk({
          page: page,
          search: search?.toString(),
          place: place?.toString(),
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
      ) : loading || !clubs ? (
        <div ref={loader}>
          <LoadingView />
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
            {loading && <img src={loadingGif} alt="loading..." />}
            {goToTop && (
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
        </>
      )}
    </>
  );
});
