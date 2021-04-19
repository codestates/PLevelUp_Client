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

//TODO: 클럽카드 변경이 계속 많아서 container / component 구분을 못했는데 , 오늘 새벽코드정리하면서  분리하겠습니다.
//TODO: 타입 any 제거
export default withRouter(function ClubCard({
  club,
  history,
  onClickCard,
  onAddBookmark,
  onRemoveBookmark,
  isBookmarked,
  isMain,
}: any) {
  //withRouter 사용시 type any필요로 함
  // const [badgeStatus, setBadgeStatus] = useState({
  //   isNewClub: false, //* New type='new'
  //   isFullClub: false, //TODO 마감
  //   isMostFullClub: false, //* 마감임박 type='mostFull'
  // });

  // const dayToClose =
  //   (new Date(club.endDate).getTime() - new Date().getTime()) /
  //   (1000 * 60 * 60 * 24);
  // const dayFromCreate =
  //   (new Date().getTime() - new Date(club.startDate).getTime()) /
  //   (1000 * 60 * 60 * 24);
  const createDate = `${new Date(club.startDate).getMonth() + 1}/
  ${new Date(club.startDate).getDate()}`;

  // useEffect(() => {
  //   if (dayToClose < 5) {
  //     setBadgeStatus({
  //       ...badgeStatus,
  //       isMostFullClub: true,
  //     });
  //   }
  //   if (dayFromCreate < 7) {
  //     setBadgeStatus({
  //       ...badgeStatus,
  //       isNewClub: true,
  //     });
  //   }
  //   if (dayToClose < 0) {
  //     setBadgeStatus({
  //       ...badgeStatus,
  //       isNewClub: false,
  //       isMostFullClub: false,
  //       isFullClub: true,
  //     });
  //   }
  // }, []);

  const defaultData = {
    //* 추후 삭제
    coverUrl:
      'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
  };

  return (
    <div className={styles.card} onClick={onClickCard}>
      <div className={styles.imgBox}>
        {club.isEnd ? (
          <>
            <div className={styles.closeBackground}></div>
            <div className={styles.close}>마 감</div>
          </>
        ) : null}
        <div className={styles.stickers}>
          <div className={styles.badge}>
            {club.isNew ? <Badge type="new">NEW</Badge> : null}
            {club.isMostEnd ? <Badge type="mostFull">마감임박</Badge> : null}
            {club.isEnd ? <Badge type="full">마감</Badge> : null}
            {club.place === '온라인' ? (
              <Badge type="online">온라인</Badge>
            ) : null}
          </div>
          {isMain && (
            <div className={styles.bookmark}>
              {isBookmarked ? (
                <FaBookmark
                  className={styles.icon}
                  onClick={onRemoveBookmark}
                />
              ) : (
                <FaRegBookmark
                  className={styles.icon}
                  onClick={onAddBookmark}
                />
              )}
            </div>
          )}
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
