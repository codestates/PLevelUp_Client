import React, { useEffect, useState } from 'react';
import styles from '../../styles/common/ClubCard.module.scss';
import Badge from './Badge';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MainClubReadResType } from '../../api/main/club';
import { MasterClubReadResType } from 'api/master/club';

type ClubCardPropsType = {
  club: MainClubReadResType | MasterClubReadResType | any; //메인에는 있고 마스터에는 없는 속성때문에 계속 에라발생
  onClickCard: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onAddBookmark: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onRemoveBookmark: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  isBookmarked: boolean | null;
  isMain: boolean;
};
export default function ClubCard({
  club,
  onClickCard,
  onAddBookmark,
  onRemoveBookmark,
  isBookmarked,
  isMain,
}: ClubCardPropsType) {
  const createDate = `${new Date(club.startDate).getMonth() + 1}/
  ${new Date(club.startDate).getDate()}`;

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
}
