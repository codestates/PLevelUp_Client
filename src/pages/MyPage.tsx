import React from 'react';

import styles from '../styles/pages/myPage/My.module.scss';
import classNames from 'classnames/bind';

import { BiDoorOpen } from "react-icons/bi";
import { MdBuild } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

export default function MyPage() {

  return (
    <div>
      <body className="wrapper">
        <div className={cx('myPage')}>
          <div className={cx('mypage_userInfo_area')}>
            <div className={cx('userInfo_info')}>
              <div className={cx('userInfo_top')}>
                <div className={cx('userInfo_profile')}>
                  <div className={cx('profile_img')}>
                    <FontAwesomeIcon icon={faUserCircle} className={cx('img_pro')} />
                  </div>
                  <div className={cx('profile_modify_btn')}>
                    <button className={cx('modify_btn')}>modify</button>
                  </div>
                </div>
                <div className={cx('userInfo_fast_info')}>
                  <div className={cx('fast_info_top')}>
                    <div className={cx('info_1_name')}>이정재 님</div>

                  </div>
                  <div className={cx('fast_info_bottom')}>
                    <div className={cx('info_box')}>
                      <div className={cx('info_box_list')}>
                        <BiDoorOpen className={cx('info_box_img')} />
                      </div>
                      <div className={cx('info_box_list')}>
                        <button className={cx('modify_logout_btn')}>로그아웃</button>
                      </div>

                    </div>
                    <div className={cx('info_box')}>
                      <div className={cx('info_box_list')}>
                        <MdBuild className={cx('info_box_img')} />
                      </div>
                      <div className={cx('info_box_list_btn')}>
                        <button className={cx('modify_pass_btn')}>비밀번호 변경</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className={cx('userInfo_bottom')}>
                <div className={cx('link_banner')}>
                  <svg className={cx('link_img')} width="100%" style={{ margin: "0px" }} overflow="hidden" height="100%" version="1.1" viewBox="0 0 115 14" xmlns="http://www.inkscape.org/namespaces/inkscape">
                    <text style={{ fill: "#ee8205", fontFamily: "Spoqa Han Sans Neo", fontSize: "22px", fontWeight: "bold" }}>P'Level Up</text>
                  </svg>

                </div>
              </div>
            </div>
          </div>
          <div className={cx('mypage_record_area')}>
            <div className={cx('record_area')}>
              <ul className={cx('record_area_ul')}>
                <li className={cx('record_area_ul_li')}>
                  <div className={cx('record_club_list')}>
                    <div className={cx('record_title')}>클럽</div>
                    <div className={cx('record_contents')}>
                      {/* <div>props로 추가될 실제 참가 클럽리스트</div> */}
                    </div>
                  </div>
                </li>
                <li className={cx('record_area_ul_li')}>
                  <div className={cx('record_club_favor_list')}>
                    <div className={cx('record_title')}>찜리스트</div>
                    <div className={cx('record_contents')}>
                      {/* <div>props로 추가될 실제 찜 클럽리스트</div> */}
                    </div>
                  </div>
                </li>
                <li className={cx('record_area_ul_li')}>
                  <div className={cx('record_club_paymentHistory')}>
                    <div className={cx('record_title')}>결제내역</div>
                    <div className={cx('record_contents')}>
                      {/* <div>props로 추가될 실제 결제내역 리스트</div> */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className={cx('ifNotInvlovedClub')}>
              <div>클럽이 없습니다.</div>
              <button>멤버쉽 신청하러 가기</button>
            </div>

          </div>
        </div>
      </body>
    </div>
  );
};

