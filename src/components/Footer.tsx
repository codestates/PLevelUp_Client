import React from 'react';
import styles from '../styles/common/Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.companyName}>주식회사 오늘의 당근</div>
        <div className={styles.companyAddress}>
          서울특별시 서초구 서초대로77길 17 스파크플러스 강남4호점
        </div>
        <div className={styles.notice}>구글 크롬에 최적화 되어있습니다.</div>
      </div>
    </div>
  );
}

export default Footer;
