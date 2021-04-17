import React, { useEffect, useState } from 'react';
import styles from '../../styles/common/ClubCard.module.scss';
import Badge from './Badge';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MainClubReadResType } from '../../api/main/club';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { withRouter } from 'react-router-dom';
import {
  addBookmarkThunk,
  removeBookmarkThunk,
} from '../../modules/club/bookmark';

// type ClubCardPropsType = {
//   club: MainClubReadResType;
// };
//TODO: 클럽카드 변경이 계속 많아서 container / component 구분을 못했는데 , 오늘 새벽코드정리하면서  분리하겠습니다.
export default withRouter(function ClubCard({ club, history }: any) {
  //withRouter 사용시 type any필요로 함
  const dispatch = useDispatch();
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const onClickCard = (e: any) => {
    history.push(`/club/${club.id}`);
  };
  const onBookmark = (e: any) => {
    if (!user?._id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(addBookmarkThunk(club.id));
  };
  const onCancelBookmark = (e: any) => {
    if (!user?._id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(removeBookmarkThunk(club.id));
  };

  const [isbookmarked, setIsbookmarked] = useState(false);
  const isDBBookmark = club.Bookmarkers.find(
    (el: { id: number }) => el.id === user?._id,
  );

  useEffect(() => {
    if (club.isBookmark) {
      setIsbookmarked(true);
    }
    if (club.isBookmark === false) {
      setIsbookmarked(false);
    }
  }, [club]);

  useEffect(() => {
    if (isDBBookmark) {
      setIsbookmarked(true);
    }
  }, []);
  const [badgeStatus, setBadgeStatus] = useState({
    isNewClub: false, //* New type='new'
    isFullClub: false, //TODO 마감
    isMostFullClub: false, //* 마감임박 type='mostFull'
  });
  // function mapToDay(number: string) {
  //   const day = ['월', '화', '수', '목', '금', '토', '일'];
  //   return day[Number(number) - 1];
  // }
  const dayToClose =
    (new Date(club.endDate).getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24);
  const dayFromCreate =
    (new Date().getTime() - new Date(club.startDate).getTime()) /
    (1000 * 60 * 60 * 24);
  const createDate = `${new Date(club.startDate).getMonth()}/${new Date(
    club.startDate,
  ).getDate()}`;
  const defaultData = {
    //* 추후 삭제
    coverUrl:
      'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
  };

  useEffect(() => {
    if (dayToClose < 5) {
      setBadgeStatus({
        ...badgeStatus,
        isMostFullClub: true,
      });
    }
    if (dayFromCreate < 7) {
      setBadgeStatus({
        ...badgeStatus,
        isNewClub: true,
      });
    }
    if (dayToClose < 0) {
      setBadgeStatus({
        ...badgeStatus,
        isNewClub: false,
        isMostFullClub: false,
        isFullClub: true,
      });
    }
  }, []);

  return (
    <div className={styles.card} onClick={onClickCard}>
      <div className={styles.imgBox}>
        {badgeStatus.isFullClub ? (
          <>
            <div className={styles.closeBackground}></div>
            <div className={styles.close}>마 감</div>
          </>
        ) : null}
        <div className={styles.stickers}>
          <div className={styles.badge}>
            {badgeStatus.isNewClub ? <Badge type="new">NEW</Badge> : null}
            {badgeStatus.isMostFullClub ? (
              <Badge type="mostFull">마감임박</Badge>
            ) : null}
            {badgeStatus.isFullClub ? <Badge type="full">마감</Badge> : null}
            {club.place === '온라인' ? (
              <Badge type="online">온라인</Badge>
            ) : null}
          </div>
          <div className={styles.bookmark}>
            {isbookmarked ? (
              <FaBookmark className={styles.icon} onClick={onCancelBookmark} />
            ) : (
              <FaRegBookmark className={styles.icon} onClick={onBookmark} />
            )}
          </div>
        </div>
        <img
          src={club.coverUrl || defaultData.coverUrl}
          className={styles.image}
        />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.infoBox}>
          {/* //TODO 클럽장 info advance로 */}
          {/* <div className={styles.info}>{club.leaderTitle}</div> */}
          <div className={styles.title}>{club.title}</div>
          <div className={styles.desc}>{club.summary}</div>
        </div>
        <div className={styles.scheduleBox}>
          {`${club.place} | 첫 모임일 ${createDate}(${club.day})`}
        </div>
      </div>
    </div>
  );
});
