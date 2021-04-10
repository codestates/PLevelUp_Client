import React from 'react';
import styles from '../../styles/common/Footer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const FooterComponent = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer_container")}>
        <div className={cx("container_flex")}>
          <div className={cx("container_list_top")}>
            <div className={cx("container_list_top_menu")}> 자주 묻는 질문</div>
            <div className={cx("container_list_top_menu")}>트레바리 채용 </div>
            <div className={cx("container_list_top_menu")}>블로그</div>
            <div className={cx("container_list_top_menu")}>파트너 모집 </div>
          </div>

          <div className={cx("container_list_bottom")}>
            <div className={cx("container_list_bottom_comName")}>주식회사 P'level Up</div>
            <div className={cx("container_list_bottom_comInfo")}>대표 팀당근 | 사업자등록번호 326-86-01375
서울특별시 종로구 율곡로10길 12, 2,3층 (와룡동, 창덕이십일) | 1522-4616 | 통신판매업신고 2019-서울종로-0920</div>
          </div>
          <div className={cx("container_list_support")}>
            <div className={cx("support_list_link")}>
              <span className={cx("list_link_text")}>트레바리 운영정책</span>
            </div>
            <div className={cx("support_list_link")}>
              <span className={cx("list_link_text")}>개인정보처리방침</span>
            </div>
            <div className={cx("support_list_link")}>
              <span className={cx("list_link_text")}>이용약관</span>
            </div>
            <div className={cx("container_list_link")}>
              <span className={cx("list_link_text")}>공지사항</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;