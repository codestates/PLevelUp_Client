import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { MainClubReadResType } from '../../../api/main/club';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';
import { Mobile, PC } from '../../../mediaQuery';
import React from 'react';

import Badge from '../../common/Badge';
import { FaHeart } from 'react-icons/fa';
import ErrorView from '../../common/ErrorView';

export default function Viewer({
  club,
  onUpdateBookmark,
  isBookmarked,
  error,
  loading,
}: {
  club: MainClubReadResType | null;
  onUpdateBookmark: (isBookmark: boolean) => void;
  isBookmarked: boolean;
  error: AxiosError | null;
  loading: boolean;
}) {
  // 에러 발생 시
  if (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return <ErrorView children={'존재하지 않는 클럽입니다.'} />;
      }

      if (error.response.status === 400) {
        return <ErrorView children={'잘못된 요청 입니다.'} />;
      }
    }
    return <ErrorView children={'오류 발생'} />;
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !club) {
    return null;
  }

  const {
    id,
    title,
    price,
    place,
    description,
    startDate,
    day,
    coverUrl,
    isNew,
    isMostStart,
    isEnd,
    currentUserNumber,
    limitUserNumber,
  } = club;
  const createDate = `${new Date(startDate).getMonth() + 1}
  /${new Date(startDate).getDate()}`;

  const clubInfoContents = (
    <div className={styles.floatingCard}>
      <div className={styles.cardImgWrap}>
        <img src={coverUrl} alt="coverUrl" />
      </div>
      <div className={styles.cardContentsWrap}>
        <div className={styles.floatingClubName}>
          <span className={styles.clubTitle}>
            {title}
            <span className={styles.badges}>
              {isNew ? <Badge type="new">NEW</Badge> : null}
              {isMostStart ? <Badge type="mostFull">마감임박</Badge> : null}
              {isEnd ? <Badge type="full">마감</Badge> : null}
              {place === '온라인' ? <Badge type="online">온라인</Badge> : null}
            </span>
          </span>
        </div>

        <div className={styles.placeTimeContainer}>
          {place} | 매 주 {day}요일
          <br />
          {`첫 모임일 ${createDate}(${club.day})`}
        </div>
        <div className={styles.monthlyPrice}>
          총 {price.toLocaleString('ko-KR')}원
        </div>
      </div>
      <div className={styles.floatingCardBtn}>
        <div className={styles.fixedAppBtnBox}>
          <div className={styles.fixedAppBtn}>
            <button className={styles.fixedAppBtn1}>
              <FaHeart
                className={
                  isBookmarked
                    ? `${styles.bookmarkIcon} ${styles.active}`
                    : `${styles.bookmarkIcon}`
                }
                onClick={() => {
                  onUpdateBookmark(!isBookmarked);
                }}
                size={24}
              />
            </button>
            <div className={styles.applyBtn}>
              <button className={styles.fixedAppBtn2}>
                <Link className={styles.paymentLink} to={`${id}/payment`}>
                  {`${
                    limitUserNumber - currentUserNumber
                  }자리 남았어요! 지금 시작`}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 내부 컴포넌트
  const CardViewer = () => (
    <div className={styles.clubInfoCard}>
      <div className={styles.clubCardContents}>
        <div className={styles.clubCardPC}>
          <PC children={clubInfoContents} />
          <Mobile children={clubInfoContents} />
        </div>
      </div>
    </div>
  );

  // 내부 컴포넌트
  const DescriptionViewer = () => (
    <div className={styles.infoContainer}>
      <div className={styles.infoWrap}>
        <div className={styles.infoContents}>
          <div
            className={styles.infoMainContents}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.readPage}>
      <CardViewer />
      <DescriptionViewer />
    </div>
  );
}
