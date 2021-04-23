import styles from '../../styles/pages/my_page/MyPage.module.scss';
import ApplyCard from '../common/ApplyCard';
import BookmarkListContainer from '../../containers/my-page/BookmarkListContainer';
import { MainApplyListResType, MainApplyResType } from 'api/main/myPage';
import { MainIsLoginResType } from 'api/main/auth';
import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { BiDoorOpen } from 'react-icons/bi';
import { MdBuild } from 'react-icons/md';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import LoadingView from 'components/common/LoadingView';

export default function MyPageForm({
  user,
  onLogout,
  apply,
  error,
  loading,
}: {
  user: MainIsLoginResType;
  onLogout: MouseEventHandler;
  apply: MainApplyListResType | null;
  error: AxiosError | null;
  loading: boolean;
}) {
  const { username } = user;

  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isNavSecondOpen, setIsNavSecondOpen] = useState(false);

  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
    setIsNavSecondOpen(!isNavSecondOpen);
  };

  if (loading) {
    return <LoadingView />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.MypageWrapper}>
        <div className={styles.userWrapper}>
          <div className={styles.flexHeader}>
            <div className={styles.imgWrapper}>
              <FaUserCircle size="110" color="#c5c5c5" />
            </div>
            <div className={styles.menuWrapper}>
              <div className={styles.menuName}>
                <p className={styles.userName}>{`${username} 님`}</p>
              </div>

              <div className={styles.menuItem}>
                <div className={styles.passwordItem}>
                  <div className={styles.passwordIcon}>
                    <MdBuild size="20" />
                  </div>
                  <div>
                    <Link to="/mypage/changepassword">비밀번호 변경</Link>
                  </div>
                </div>
                <div className={styles.logOutItem}>
                  <div className={styles.logOutIcon}>
                    <BiDoorOpen size="20" />
                  </div>
                  <div className={styles.logOutBtn} onClick={onLogout}>
                    로그아웃
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bannerBox}>
            <a className={styles.aBox}>
              <div className={styles.banner}>
                <div className={styles.title}>
                  사회적 거리두기 단계별 운영방침 💪🏻
                </div>
                <div className={styles.subTitle}>
                  <span>더 알아보기</span>
                  <span>
                    <HiOutlineChevronRight />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomWrapper}>
        <div className={styles.tabWrapper}>
          <ul className={styles.nav}>
            <div
              className={
                isNavOpen
                  ? `${styles.navItemWrapper} ${styles.active}`
                  : `${styles.navItemWrapper}`
              }
              onClick={handleNavOpen}
            >
              <li className={styles.navItem}>클럽</li>
            </div>
            <div
              className={
                isNavSecondOpen
                  ? `${styles.navItemWrapper} ${styles.active}`
                  : `${styles.navItemWrapper}`
              }
              onClick={handleNavOpen}
            >
              <li className={styles.navItem}>찜리스트</li>
            </div>
          </ul>
        </div>

        <div className={styles.tabContent}>
          <div className={styles.tabBodyWrapper}>
            {isNavOpen ? (
              <div className={styles.tabBodbyClub}>
                {apply ? (
                  <div className={styles.applyCard}>
                    {apply.map((club: MainApplyResType) => (
                      <ApplyCard
                        key={club.title}
                        title={club.title}
                        summary={club.summary}
                        place={club.place}
                        times={club.times}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={styles.clubEmptyBox}>
                    <p className={styles.message}>클럽이 없습니다.</p>
                    <button className={styles.moveBtn}>
                      <Link to="/club">멤버쉽 신청하러 가기</Link>
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            {isNavSecondOpen ? (
              <div className={styles.tabBodbyBookmark}>
                <BookmarkListContainer />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
