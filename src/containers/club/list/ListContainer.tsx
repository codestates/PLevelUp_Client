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

export default withRouter(function ListContainer({ location, match }) {
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

  const newStateClub = currentClubs.map((
    club: MainClubReadResType, //TODO: 12시 이후, immer로 가독성높이기
  ) =>
    club.id === bookmark?.clubId
      ? {
          ...club,
          isBookmark: !club.isBookmark,
        }
      : club,
  );

  useEffect(() => {
    setCurrentClubs(newStateClub);
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
          dispatch(mainListThunk({ page: page }));
          setPage(page + 1);
        } else {
          setGoToTop(true);
        }
      }
    },
    [page, clubs],
  );

  useEffect(() => {
    dispatch(mainListThunk({ page: page }));
    setPage(page + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });
    observer.observe(loader.current);

    return () => observer && observer.disconnect();
  }, [handleObserver]);

  if (error) return <img src={loadingGif} alt="loading..." />;
  return (
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
  );
});
