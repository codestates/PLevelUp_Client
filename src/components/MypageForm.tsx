import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/my_page/Mypage.module.scss';

import { BiDoorOpen } from 'react-icons/bi';
import { MdBuild } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function MyPage({ user, onLogout }: any) {
  console.log(user);
  return (
    <div>
      <body className="wrapper">
        <div className={styles.myPage}>
          <div className={styles.mypage_userInfo_area}>
            <div className={styles.userInfo_info}>
              <div className={styles.userInfo_top}>
                <div className={styles.userInfo_profile}>
                  <div className={styles.profile_img}>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className={styles.img_pro}
                    />
                  </div>
                </div>
                <div className={styles.userInfo_fast_info}>
                  <div className={styles.fast_info_top}>
                    <div className={styles.info_1_name}>{user}</div>
                  </div>
                  <div className={styles.fast_info_bottom}>
                    <div className={styles.info_box}>
                      <div className={styles.info_box_list}>
                        <MdBuild className={styles.info_box_img} />
                      </div>
                      <div className={styles.info_box_list}>
                        <button
                          className={styles.modify_pass_btn}
                          onClick={onLogout}
                        >
                          <Link to="/update">비밀번호 변경</Link>
                        </button>
                      </div>
                    </div>
                    <div className={styles.info_box}>
                      <div className={styles.info_box_list}>
                        <BiDoorOpen className={styles.info_box_img} />
                      </div>
                      <div className={styles.info_box_list_btn}>
                        <button className={styles.modify_logout_btn}>
                          로그아웃
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.userInfo_bottom}>
                <div className={styles.link_banner}>
                  <svg
                    className={styles.link_img}
                    width="100%"
                    style={{ margin: '0px' }}
                    overflow="hidden"
                    height="100%"
                    version="1.1"
                    viewBox="0 0 115 14"
                    xmlns="http://www.inkscape.org/namespaces/inkscape"
                  >
                    <text
                      style={{
                        fill: '#ee8205',
                        fontFamily: 'Spoqa Han Sans Neo',
                        fontSize: '22px',
                        fontWeight: 'bold',
                      }}
                    >
                      P'Level Up
                    </text>
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
              <button>
                <Link to="/list">멤버쉽 신청하러 가기</Link>
              </button>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
