import React from 'react';

import styles from '../styles/pages/Detail_page/DetailPage.module.scss';
import { FaUserCircle } from 'react-icons/fa';
export default function DetailPage() {

  return (
    <div>
      <body className={styles.wrapper}>
        <div className={styles.detailPage}>
          <div className={styles.club_Detail_container}>
            <div className={styles.club_Info_card}>
              <div className={styles.club_card_contents}>
                <div className={styles.club_card_PC}>
                  <div className={styles.floating_card}>
                    <div className={styles.floating_img_container}>
                      <img className={styles.card_img} alt="카드 이미지 영역입니다." />
                    </div>
                    <div className={styles.floating_card_contents}>
                      <div className={styles.floating_club_name}>
                        <span className={styles.club_title}>
                          씀-파도
                          <span className={styles.badges}>
                            <span className={styles.tag_solid}>마감임박</span>
                          </span>
                        </span>
                      </div>
                      <div className={styles.place_time_container}>
                        "강남 아지트"
                        {/*  */}
                        |
                        {/*  */}
                        {/*  */}
                        "매달 세 번째 목요일"
                        {/*  */}
                        <br></br>
                        첫 모임일
                        {/*  */}
                        {/*  */}
                        4.15(목)
                      </div>
                      <div className={styles.monthly_price}>
                        월
                        {/*  */}
                        52,500원
                      </div>
                    </div>
                    <div className={styles.floating_card_btn}>
                      <div className={styles.fixed_app_btn_box}>
                        <div className={styles.fixed_app_btn}>
                          <button className={styles.fixed_app_btn_1}>
                            <FaUserCircle className={styles.imsi_img} />
                          </button>
                          <div>
                            <button className={styles.fixed_app_btn_2}>2자리 남았어요! 지금 시작</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.Club_card_Mobile}></div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

