import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { MainClubReadResType } from '../../../api/main/club';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';
import { Mobile, PC } from '../../../mediaQuery';
import React from 'react';

import { FaHeart } from 'react-icons/fa';
import Error from '../../common/Error';

export default function Viewer({
  club,
  error,
  loading,
}: {
  club: MainClubReadResType | null;
  error: AxiosError | null;
  loading: boolean;
}) {
  // 에러 발생 시
  if (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return <Error children={'존재하지 않는 클럽입니다.'} />;
      }

      if (error.response.status === 400) {
        return <Error children={'잘못된 요청 입니다.'} />;
      }
    }
    return <Error children={'오류 발생'} />;
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
  } = club;

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
              <span className={styles.tagSolid}>
                {/* 임시 더미 데이터 작성했습니다. */}
                마감임박
              </span>
            </span>
          </span>
        </div>

        <div className={styles.placeTimeContainer}>
          {/* 임시 더미 데이터 작성했습니다. */}
          {place} | 매달 세 번째 {day}요일
          <br />첫 모임일
          {startDate}
        </div>
        <div className={styles.monthlyPrice}>월 {price}원</div>
      </div>
      <div className={styles.floatingCardBtn}>
        <div className={styles.fixedAppBtnBox}>
          <div className={styles.fixedAppBtn}>
            {/* TODO: 찜되면 컬러 변경 해야함 #FD5600 */}
            <button
              className={styles.fixedAppBtn1}
              style={{ color: '#FDA254' }}
            >
              <FaHeart className={styles.bookmarkIcon} size={24} />
            </button>
            <div className={styles.applyBtn}>
              <button className={styles.fixedAppBtn2}>
                {/* TODO: 실제 남은자리 데이터 변경 필요*/}
                2자리 남았어요! 지금 시작
              </button>
              {/* 임시 이동버튼 추가 */}
              <button>
                <Link to={`club/${id}/payment`}>이동</Link>
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
