import styles from '../../styles/common/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.infoBox}>
            <div className={styles.name}>주식회사 P' Level Up</div>
            <div className={styles.place}>
              오늘의 당근 | 서울특별시 서초구 서초대로77길 17 스파크플러스
              강남4호점
            </div>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.list}>운영정책</div>
            <div className={styles.list}>개인정보처리방침</div>
            <div className={styles.list}>이용약관</div>
            <div className={styles.list}>공지사항</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
