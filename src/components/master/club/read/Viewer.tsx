import styles from '../../../../styles/pages/master/read_page/ReadPage.module.scss';
import { MasterClubReadResType } from '../../../../api/master/club';
import { AxiosError } from 'axios';
import { FaHeart } from 'react-icons/fa';
import { Mobile, PC } from '../../../../mediaQuery';
import React from 'react';

type ViewerType = {
  club: MasterClubReadResType | null;
  error: AxiosError | null;
  loading: boolean;
  actionButtons: JSX.Element;
};

export default function Viewer({
  club,
  error,
  loading,
  actionButtons,
}: ViewerType) {
  // 에러 발생 시
  if (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return (
          <div className={styles.masterReadWrapper}>
            존재하지 않는 클럽입니다.
          </div>
        );
      }

      if (error.response.status === 400) {
        return (
          <div className={styles.masterReadWrapper}>잘못된 요청 입니다.</div>
        );
      }
      if (error.response.status === 403) {
        return (
          <div className={styles.masterReadWrapper}>
            해당 클럽을 작성한 클럽장이 아닙니다.
            <br /> 본인이 작성한 클럽만 확인해주세요.
          </div>
        );
      }
    }
    return <div className={styles.masterReadWrapper}>오류 발생.</div>;
  }

  console.log(loading);
  console.log(club);

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !club) {
    return null;
  }

  const {
    title,
    summary,
    price,
    place,
    description,
    startDate,
    times,
    day,
    limitUserNumber,
    Master: master,
    coverUrl,
    createdAt,
    updatedAt,
  } = club;

  return (
    <div className={styles.masterReadWrapper}>
      <div className={styles.readHead}>
        <h1>{title}</h1>
        <div className={styles.subInfo}>
          <span>
            <b>{master.username}</b>
          </span>
          <span>
            {`등록: ${createdAt}`}
            {updatedAt !== null && `, 최종 업데이트 : ${updatedAt}`}
          </span>
        </div>
        <div>{place}</div>
        <div>{price}</div>
        <div>{day}</div>
        <div>{startDate}</div>
        <div>{times}</div>
        <div>{limitUserNumber}</div>
        <div>
          coverUrl 입니다.
          <img src={coverUrl} />
        </div>
      </div>
      <div>{summary}</div>
      <div
        className={styles.readContent}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {actionButtons}
    </div>
  );

  //   const clubInfoContents = (
  //     <div className={styles.floatingCard}>
  //       <div className={styles.cardImgWrap}>
  //         <img src={coverUrl} alt="coverUrl" />
  //       </div>
  //       <div className={styles.cardContentsWrap}>
  //         <div className={styles.floatingClubName}>
  //           <span className={styles.clubTitle}>
  //             {title}
  //             <span className={styles.badges}>
  //               <span className={styles.tagSolid}>
  //                 {/* 임시 더미 데이터 작성했습니다. */}
  //                 마감임박
  //               </span>
  //             </span>
  //           </span>
  //         </div>
  //         <div>{place}</div>
  //         <div>{price}</div>
  //         <div>{day}</div>
  //         <div>{startDate}</div>
  //         <div>{times}</div>
  //         <div>{limitUserNumber}</div>
  //         <div>
  //           coverUrl 입니다.
  //           <img src={coverUrl} />
  //
  //         <div className={styles.placeTimeContainer}>
  //           {/* 임시 더미 데이터 작성했습니다. */}
  //           {place} | 매달 세 번째 {day}요일
  //           <br />첫 모임일
  //           {startDate}
  //         </div>
  //         <div className={styles.monthlyPrice}>월 {price}원</div>
  //       </div>
  //     </div>
  //   );
  //
  //   // 내부 컴포넌트
  //   const CardViewer = () => (
  //     <div className={styles.clubInfoCard}>
  //       <div className={styles.clubCardContents}>
  //         <div className={styles.clubCardPC}>
  //           <PC children={clubInfoContents} />
  //           <Mobile children={clubInfoContents} />
  //         </div>
  //       </div>
  //     </div>
  //   );
  //
  //   // 내부 컴포넌트
  //   const DescriptionViewer = () => (
  //     <div className={styles.infoContainer}>
  //       <div className={styles.infoWrap}>
  //         <div className={styles.infoContents}>
  //           <div
  //             className={styles.infoMainContents}
  //             dangerouslySetInnerHTML={{ __html: description }}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  //
  //   return (
  //     <div className={styles.masterReadPage}>
  //       <CardViewer />
  //       <DescriptionViewer />
  //       {actionButtons}
  //     </div>
  //   );
}
