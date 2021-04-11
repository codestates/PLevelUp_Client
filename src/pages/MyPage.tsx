import React from 'react';

import styles from '../styles/pages/myPage/MyPage.module.scss';

import { FaUserCircle } from 'react-icons/fa';
import { BiDoorOpen } from "react-icons/bi";
import { MdBuild } from "react-icons/md";

export default function MyPage() {

  return (
    <div>
      <body className={styles.wrapper}>
        <div className={styles.myPage}>
          <div className={styles.mypage_userInfo_area}>
            <div className={styles.userInfo_info}>
              <div className={styles.userInfo_top}>
                <div className={styles.userInfo_profile}>
                  <div className={styles.profile_img}>
                    <FaUserCircle className={styles.img_pro} />
                  </div>
                  <div className={styles.profile_modify_btn}>
                    <button className={styles.modify_btn}>modify</button>
                  </div>
                </div>
                <div className={styles.userInfo_fast_info}>
                  <div className={styles.fast_info_top}>
                    <div className={styles.info_1_name}>이정재 님</div>

                  </div>
                  <div className={styles.fast_info_bottom}>
                    <div className={styles.info_box}>
                      <div className={styles.info_box_list}>
                        <BiDoorOpen className={styles.info_box_img} />
                      </div>
                      <div className={styles.info_box_list}>
                        <button className={styles.modify_logout_btn}>로그아웃</button>
                      </div>

                    </div>
                    <div className={styles.info_box}>
                      <div className={styles.info_box_list}>
                        <MdBuild className={styles.info_box_img} />
                      </div>
                      <div className={styles.info_box_list_btn}>
                        <button className={styles.modify_pass_btn}>비밀번호 변경</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className={styles.userInfo_bottom}>
                <div className={styles.link_banner}>
                  <svg className={styles.link_img} version="1.1" viewBox="0 0 115 14" xmlns="http://www.inkscape.org/namespaces/inkscape">
                    <text className={styles.link_img_text}>P'Level Up</text>
                  </svg>

                </div>
              </div>
            </div>
          </div>
          <div className={styles.mypage_record_area}>
            <div className={styles.record_area}>
              <ul className={styles.record_area_ul}>
                <li className={styles.record_area_ul_li}>
                  <div className={styles.record_club_list}>
                    <div className={styles.record_title}>클럽</div>
                    <div className={styles.record_contents}>
                      {/* <div>props로 추가될 실제 참가 클럽리스트</div> */}
                    </div>
                  </div>
                </li>
                <li className={styles.record_area_ul_li}>
                  <div className={styles.record_club_favor_list}>
                    <div className={styles.record_title}>찜리스트</div>
                    <div className={styles.record_contents}>
                      {/* <div>props로 추가될 실제 찜 클럽리스트</div> */}
                    </div>
                  </div>
                </li>
                <li className={styles.record_area_ul_li}>
                  <div className={styles.record_club_paymentHistory}>
                    <div className={styles.record_title}>결제내역</div>
                    <div className={styles.record_contents}>
                      {/* <div>props로 추가될 실제 결제내역 리스트</div> */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.ifNotInvlovedClub}>
              <div>클럽이 없습니다.</div>
              <button>멤버쉽 신청하러 가기</button>
            </div>

          </div>
        </div>
      </body>
    </div>
  );
};

