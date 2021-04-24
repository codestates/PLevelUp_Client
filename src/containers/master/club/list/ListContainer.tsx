import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import List from '../../../../components/master/club/list/List';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../../modules';
import styles from '../../../../styles/pages/master/list_page/ListPage.module.scss';
import { FaArrowCircleUp } from 'react-icons/fa';
import { MasterClubListResType } from '../../../../api/master/club';
import {
  masterClubUnloadList,
  masterListThunk,
} from '../../../../modules/master/club/list';
import ErrorView from '../../../../components/common/ErrorView';
import Loading from '../../../../components/common/Loading';
import ListWriteButton from 'components/master/club/list/ListWriteButton';

export default withRouter(function ListContainer({ location, match }) {
  const dispatch = useDispatch();
  const loader = useRef<HTMLDivElement>(null);
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
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, [handleObserver]);

  if (!master)
    return (
      <ErrorView
        children={<div ref={loader}>클럽장만 볼 수 있는 페이지 입니다.</div>}
        isGoMainBtn={true}
      />
    );
  return (
    <>
      <ListWriteButton />
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
            <div style={{ minHeight: '50px' }} />
          </div>
        </>
      )}
    </>
  );
});
