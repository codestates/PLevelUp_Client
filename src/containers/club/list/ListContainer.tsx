import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
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

  const { search = '', place = '' } = qs.parse(location.search, {
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

  const onSearch = (search: string) => {
    const query = qs.stringify({ search, place });
    history.push(`/club?${query}`);
    // window.location.reload();
    dispatch(mainClubUnloadList());
    setCurrentClubs([]);
    dispatch(
      mainListThunk({ page: 1, search: search, place: place?.toString() }),
    );
    setPage(2);
  };

  const onPlace = (place: string | null) => {
    const query = qs.stringify({ search, place });
    history.push(`/club?${query}`);
    dispatch(mainClubUnloadList());
    setCurrentClubs([]);

    dispatch(
      mainListThunk({
        page: 1,
        search: search?.toString(),
        place: place?.toString(),
      }),
    );
    setPage(2);
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

  if (error)
    return (
      <div ref={loader}>
        <img src={loadingGif} alt="loading..." />
      </div>
    );

  if (lastPage === 0) {
    return <div ref={loader}>리스트가 없습니다.</div>;
  }

  return (
    <>
      <Search onSearch={onSearch} onPlace={onPlace} />
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
  );
});
