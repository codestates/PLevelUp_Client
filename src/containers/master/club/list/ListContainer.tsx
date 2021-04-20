import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import List from '../../../../components/master/club/list/List';
import { withRouter, Link } from 'react-router-dom';
import { RootState } from '../../../../modules';
import {
  mainClubUnloadList,
  mainListThunk,
} from '../../../../modules/club/list';
import loadingGif from '../../../../asset/loading.gif';
import styles from '../../../../styles/pages/list_page/ListPage.module.scss';
import errorStyles from '../../../../styles/common/Error.module.scss';
import { FaArrowCircleUp } from 'react-icons/fa';
import fileImg from '../../../../asset/file.png';
import { MasterClubListResType } from '../../../../api/master/club';
import {
  masterClubUnloadList,
  masterListThunk,
} from '../../../../modules/master/club/list';

export default withRouter(function ListContainer({ location, match }) {
  const dispatch = useDispatch();
  const loader = useRef<any>(null);
  const [page, setPage] = useState<number>(1);
  const [goToTop, setGoToTop] = useState(false);
  const [currentClubs, setCurrentClubs] = useState<MasterClubListResType>([]);

  const { clubs, error, loading, lastPage, master } = useSelector(
    ({ masterListAsync, masterUser }: RootState) => ({
      clubs: masterListAsync.clubs.data,
      error: masterListAsync.clubs.error,
      loading: masterListAsync.clubs.loading,
      lastPage: masterListAsync.lastPage,
      master: masterUser.user?.data,
    }),
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!loading && clubs) {
        setCurrentClubs(currentClubs.concat(clubs));
        dispatch(masterClubUnloadList());
      }
      if (entries[0].isIntersecting && !loading) {
        console.log('여기');
        if (lastPage >= page) {
          dispatch(masterListThunk({ page: page }));
          setPage(page + 1);
        } else {
          setGoToTop(true);
        }
      }
    },
    [page, clubs],
  );

  useEffect(() => {
    dispatch(masterListThunk({ page: page }));
    setPage(page + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });
    observer.observe(loader.current);

    return () => observer && observer.disconnect();
  }, [handleObserver]);

  if (!master)
    return (
      <div className={errorStyles.errorWrapper}>
        <div className={errorStyles.errorContainer}>
          <div>
            <img src={fileImg} className={errorStyles.errorImg} />
          </div>
          <div className={errorStyles.errorMessage}>클럽장만 볼 수 있는 페이지 입니다.</div>
          <div ref={loader} />
          <div className={errorStyles.RedirectBtn}>
            <Link to="/" className={errorStyles.LinkContainer}>
              모든 클럽 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <>
        <img src={loadingGif} alt="loading..." />
        <div ref={loader} />
      </>
    );
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
