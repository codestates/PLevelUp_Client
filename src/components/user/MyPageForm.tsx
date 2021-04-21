import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/pages/my_page/MyPage.module.scss';
import { BiDoorOpen } from 'react-icons/bi';
import { MdBuild } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import BookmarkListContainer from '../../containers/my-page/BookmarkListContainer';
export default function MyPageForm({ user, onLogout }: any) {
  // const { username } = user;
  return (
    <>
      <div className="wrapper">
        <div className={styles.MyPage}>
          <div className={styles.userWrapper}>
            <div className={styles.userInfo}>
              <div className={styles.userInfoTop}>
                <div className={styles.profile}>
                  <div className={styles.profileImg}>
                    <FaUserCircle className={styles.imgPro} />
                  </div>
                </div>
                <div className={styles.userfastInfo}>
                  <div className={styles.fastInfoTop}>
                    {/* <div className={styles.userName}>{username}님</div> ->  */}
                  </div>
                  <div className={styles.fastInfoBottom}>
                    <div className={styles.infoBox}>
                      <div className={styles.infoBoxList}>
                        <MdBuild className={styles.InfoBoxImg} />
                      </div>
                      <div className={styles.infoBoxList}>
                        <button className={styles.changePasswordBtn}>
                          <Link to="/update">비밀번호 변경</Link>
                        </button>
                      </div>
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.infoBoxList}>
                        <BiDoorOpen className={styles.InfoBoxImg} />
                      </div>
                      <div className={styles.infoBoxListBtn}>
                        <button className={styles.logOutBtn} onClick={onLogout}>
                          로그아웃
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.userInfoBottom}>
                <div className={styles.banner}>
                  <svg
                    className={styles.bannerImg}
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
          <div className={styles.recordAreaWrapper}>
            <div className={styles.recordArea}>
              <ul className={styles.areaName}>
                <li className={styles.areaList}>
                  <div className={styles.recordClubList}>
                    <div className={styles.recordTitle}>클럽</div>
                    <div className={styles.recordContents}>
                      {/* <div>props로 추가될 실제 참가 클럽리스트</div> */}
                    </div>
                  </div>
                </li>
                <li className={styles.areaList}>
                  <div className={styles.recordFavoriteList}>
                    <div className={styles.recordTitle}>찜리스트</div>
                    <div className={styles.recordContents}>
                      <BookmarkListContainer />
                      {/* <div>props로 추가될 실제 찜 클럽리스트</div> */}
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
      </div>
    </>
  );
}
