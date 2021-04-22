import React from 'react';
import styles from '../../styles/common/ClubCard.module.scss';
import Badge from './Badge';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MainClubReadResType } from '../../api/main/club';
import { MasterClubReadResType } from 'api/master/club';

type ClubCardPropsType = {
  club: MainClubReadResType | MasterClubReadResType;
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
        {club.isEnd && (
          <>
            <div className={styles.closeBackground} />
            <div className={styles.close}>종 료</div>
          </>
        )}
        {club.isStart ? (
          <>
            <div className={styles.closeBackground} />
            <div className={styles.close}>마 감</div>
          </>
        ) : null}
        <div className={styles.stickers}>
          <div className={styles.badge}>
            {club.isNew ? <Badge type="new">NEW</Badge> : null}
            {club.isMostStart ? <Badge type="mostFull">마감임박</Badge> : null}
            {/*{club.isStart ? <Badge type="full">마감</Badge> : null}*/}
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
          alt="coverUrl"
        />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.infoBox}>
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
