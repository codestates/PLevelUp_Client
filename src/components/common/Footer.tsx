import React from 'react';
import styles from '../../styles/common/Footer.module.scss';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.containerFlex}>
          <div className={styles.containerListTop}>
            {/* <div className={styles.container_list_top_menu}> 자주 묻는 질문</div>
            <div className={styles.container_list_top_menu}>트레바리 채용 </div>
            <div className={styles.container_list_top_menu}>블로그</div>
            <div className={styles.container_list_top_menu}>파트너 모집 </div> */}
          </div>

          <div className={styles.containerListBottom}>
            <div className={styles.containerListBottomComName}>주식회사 P'level Up</div>
            <div className={styles.containerListBottomComInfo}>대표 팀당근 | 사업자등록번호 326-86-01375
서울특별시 종로구 율곡로10길 12, 2,3층 (와룡동, 창덕이십일) | 1522-4616 | 통신판매업신고 2019-서울종로-0920</div>
          </div>
          <div className={styles.containerListSupport}>
            <div className={styles.supportListLink}>
              <span className={styles.listLinkText}>프레벨업 운영정책</span>
            </div>
            <div className={styles.supportListLink}>
              <span className={styles.listLinkText}>개인정보처리방침</span>
            </div>
            <div className={styles.support_list_link}>
              <span className={styles.listLinkText}>이용약관</span>
            </div>
            <div className={styles.containerListLink}>
              <span className={styles.listLinkText}>공지사항</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


