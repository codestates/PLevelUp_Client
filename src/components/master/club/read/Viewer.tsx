import styles from '../../../../styles/pages/master/read_page/ReadPage.module.scss';
import { MasterClubReadResType } from '../../../../api/master/club';
import { AxiosError } from 'axios';

type ViewerType = {
  club: MasterClubReadResType | null;
  error: AxiosError | null;
  loading: boolean;
};

export default function Viewer({ club, error, loading }: ViewerType) {
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
            <br />
            본인이 작성한 클럽만 확인해주세요.
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
    summary,
    price,
    place,
    description,
    topic,
    startDate,
    endDate,
    day,
    limitUserNumber,
    Master: master,
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
            {updatedAt ? `수정시간 : ${updatedAt}` : `등록시간: ${createdAt}`}
          </span>
        </div>
        <div>{place}</div>
        <div>{price}</div>
        <div>{day}</div>
        <div>{startDate}</div>
        <div>{endDate}</div>
        <div>{limitUserNumber}</div>
      </div>
      <div
        className={styles.readContent}
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div
        className={styles.readContent}
        dangerouslySetInnerHTML={{ __html: topic }}
      />
      <div
        className={styles.readContent}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
