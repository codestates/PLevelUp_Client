import { MainApplyResType } from 'api/main/myPage';
import styles from '../../styles/common/ApplyCard.module.scss';

export default function ApplyCard({
  title,
  place,
  summary,
  times,
}: MainApplyResType) {
  return (
    <div className={styles.applyContainer}>
      <div className={styles.contentBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.summary}>{summary}</div>
      </div>
      <hr />
      <div
        className={styles.placeAndTime}
      >{`${place}에서 주 ${times}회 함께해요! 🧚🏻 `}</div>
    </div>
  );
}
