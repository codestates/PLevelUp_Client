import styles from '../../../../styles/pages/master/read_page/ReadPage.module.scss';
import { MasterClubReadResType } from '../../../../api/master/club';
import { AxiosError } from 'axios';
import { Mobile, PC } from '../../../../lib/styles/MediaQuery';
import React, { useState } from 'react';
import Badge from '../../../common/Badge';
import AskRemoveModal from './AskRemoveModal';

type ViewerType = {
  club: MasterClubReadResType | null;
  error: AxiosError | null;
  loading: boolean;
  onUpdate: () => void;
  onRemove: () => void;
};

export default function Viewer({
  club,
  error,
  loading,
  onUpdate,
  onRemove,
}: ViewerType) {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };
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

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !club) {
    return null;
  }

  const {
    title,
    price,
    place,
    description,
    startDate,
    times,
    day,
    coverUrl,
    isNew,
    isMostStart,
    isEnd,
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
          {place} | 매 주 {day}요일 | 총 {times}회
          <br />
          {`첫 모임일 ${createDate}(${club.day})`} | 최대 {limitUserNumber} 명
        </div>
        <div className={styles.monthlyPrice}>
          총 {price.toLocaleString('ko-KR')}원
        </div>
      </div>
      <div className={styles.floatingCardBtn}>
        <div className={styles.fixedAppBtnBox}>
          <div className={styles.fixedAppBtn}>
            <button className={styles.fixedAppBtn1} onClick={onUpdate}>
              수정
            </button>
            <div className={styles.removeBtn}>
              <button className={styles.fixedAppBtn2} onClick={onRemoveClick}>
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //
  //   // 내부 컴포넌트
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
  //
  //   // 내부 컴포넌트
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
    <>
      <div className={styles.masterReadPage}>
        <CardViewer />
        <DescriptionViewer />
      </div>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
}
