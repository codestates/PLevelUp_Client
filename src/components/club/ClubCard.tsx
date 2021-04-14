import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/common/ClubCard.module.scss';
import Tag from '../common/Tag';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
export default function ClubCard({ club, bookmark }: any) {
  const [tagStatus, setTagStatus] = useState({
    isNewClub: false, //* New type='new'
    isFullClub: false, //TODO 마감
    isMostFullClub: false, //* 마감임박 type='mostFull'
  });
  function mapToDay(number: number) {
    const day = ['월', '화', '수', '목', '금', '토', '일'];
    return day[number - 1];
  }

  club = {
    //* 클럽은 props로 받아옴
    description: '스타트업에서 빠르게 성장하는 사람들의 비밀',
    coverUrl:
      'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
    dayOfSchedule: 6,
    leaderTitle: '와디즈 CSO 황인범 님의',
    maxMemberCount: 20,
    memberCount: 1,
    name: '스타트업 DNA',
    openedAt:
      '02' ||
      '4/17' ||
      'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
    closedAt: '05',
    place: '온라인',
    price: 310000,
    weekOfSchedule: 3,
    wishedCount: 3,
  };
  bookmark = {
    //* 북마크는 props 로 받아옴
    id: 'WISH_CLUB',
    name: '내가찜한클럽',
  };
  //ToDO : 동적렌더링 이후 날짜 올바르게 계산하여 작동하도록 함
  useEffect(() => {
    console.log(club.closedAt - club.openedAt);
    if (club.closedAt - club.openedAt < 5) {
      setTagStatus({
        ...tagStatus,
        isMostFullClub: true,
      });
    }
    if (13 - club.openedAt < 7) {
      setTagStatus({
        ...tagStatus,
        isNewClub: true,
      });
    }
  }, []);
  //* 참고용 더미데이터
  const clubDummyData = {
    imageURL: club.coverUrl || '이미지주소',
    title: club.name || '스타트업DNA',
    desc: club.description || '스타트업에서 빠르게 성장하는 사람들의 비밀',
    info: club.leaderTitle || '와디즈 SCO 황인범 님의(optional)',
    place: club.place || '온라인| 홍대 | 강남',
    start: `${club.openedAt}(${mapToDay(club.dayOfSchedule)})` || '4/17(토)',
  };
  return (
    <div className={styles.card}>
      <Link className={styles.link} to="/detail">
        <div className={styles.imgBox}>
          <div className={styles.stickers}>
            <div className={styles.tag}>
              {tagStatus.isNewClub ? <Tag type="new">NEW</Tag> : null}
              {tagStatus.isMostFullClub ? (
                <Tag type="mostFull">마감임박</Tag>
              ) : null}
              {club.place === '온라인' ? <Tag type="online">온라인</Tag> : null}
            </div>
            <div className={styles.bookmark}>
              {bookmark ? (
                <FaRegBookmark className={styles.icon} />
              ) : (
                <FaBookmark className={styles.icon} />
              )}
            </div>
          </div>
          <img src={club.coverUrl} className={styles.image} />
        </div>
        <div className={styles.contentBox}>
          <div className={styles.infoBox}>
            <div className={styles.info}>{club.leaderTitle}</div>
            <div className={styles.title}>{club.name}</div>
            <div className={styles.desc}>{club.description}</div>
          </div>
          <div className={styles.scheduleBox}>
            {`${club.place} | 첫 모임일 ${club.openedAt}(${mapToDay(
              club.dayOfSchedule,
            )})`}
          </div>
        </div>
      </Link>
    </div>
  );
}
