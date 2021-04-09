import React from 'react';
import styles from '../../styles/common/ClubCard.module.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
export default function ClubCard({ club, bookmark }: any) {
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
      '4/17' ||
      'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
    option: '온라인',
    place: '온라인(Zoom)',
    price: 310000,
    weekOfSchedule: 3,
    wishedCount: 3,
  };
  bookmark = {
    //* 북마크는 props 로 받아옴
    id: 'WISH_CLUB',
    name: '내가찜한클럽',
  };
  const tag = {
    //* 트레바리에서는 hooks State로 관리
    isNewClub: false, //* New
    isMostFullClub: false, //* 마감임박
    isFullClub: false, //* 마감
    isOverDeadLineClub: false, //* 마감처리완료(블러)
  };
  const NeedRealclub = {
    imageURL: club.coverUrl || '이미지주소',
    title: club.name || '스타트업DNA',
    desc: club.description || '스타트업에서 빠르게 성장하는 사람들의 비밀',
    info: club.leaderTitle || '와디즈 SCO 황인범 님의(optional)',
    place: club.place || '온라인| 홍대 | 강남',
    start: `${club.openedAt}(${mapToDay(club.dayOfSchedule)})` || '4/17(토)',
  };
  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <div className={styles.stickers}>
          <div className={styles.tag}>{club.tag}</div>
          <div className={styles.bookmark}></div>
        </div>
        <div></div>
      </div>
      <div className={styles.contentBox}></div>
    </div>
  );
}
