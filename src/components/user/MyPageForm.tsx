import styles from '../../styles/pages/my_page/MyPage.module.scss';
import ApplyCard from './ApplyCard';
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
import Loading from '../../components/common/Loading';

export default function MyPageForm({
  user,
  onLogout,
  apply,
  error,
  loading,
}: {
  user: MainIsLoginResType;
  onLogout: MouseEventHandler;
  apply: MainApplyListResType | [];
  error: AxiosError | null;
  loading: boolean;
}) {
  const { username } = user;

  const [isNavOpen, setIsNavOpen] = useState(true);
  // const [isNavSecondOpen, setIsNavSecondOpen] = useState(false);
  //민정 플젝이후 리팩: isNav를 개수만큼 만드는 건 좋지 않은 접근방법이라 생각, 2개일 경우는 T/F 로 3개이상은 카테고리배열만들것.
  //민정 플젝이후 리팩: isNavOpen을 isFirstOpen 등과 같이 변경사함을 더 잘 담는 변수명으로 변경
  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
    // setIsNavSecondOpen(!isNavSecondOpen);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.flexHeader}>
          {/* 민정 플젝이후 리팩: 여기 컴포넌트(flexHeader 자리에) */}
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
                  <Link className={styles.link} to="/mypage/changepassword">
                    비밀번호 변경
                  </Link>
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
        {/* 민정 플젝이후 리팩: 여기 컴포넌트2 */}
        <div className={styles.bannerBox}>
          <a className={styles.aBox}>
            {/* 민정 플젝이후 리팩: Link교체 */}
            <div className={styles.banner}>
              <div className={styles.title}>
                사회적 거리두기 단계별 운영방침 💪🏻
              </div>
              <div className={styles.subTitle}>
                <span>
                  더 알아보기 <HiOutlineChevronRight />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      {/* 민정 플젝이후 리팩:  Help페이지 참고 */}
      <div className={styles.listContainer}>
        <div className={styles.tabCategories}>
          <div
            className={
              isNavOpen
                ? `${styles.categoryWrapper} ${styles.active}`
                : `${styles.categoryWrapper}`
            }
            onClick={handleNavOpen}
          >
            <span className={styles.category}>클럽</span>
          </div>
          <div
            className={
              isNavOpen
                ? `${styles.categoryWrapper}`
                : `${styles.categoryWrapper}  ${styles.active}`
            }
            onClick={handleNavOpen}
          >
            <span className={styles.category}>찜리스트</span>
          </div>
        </div>

        <div className={styles.tabContent}>
          {/* //민정 플젝이후 리팩: 삼항연산자는 간단하지 않으면 코드이해도를 심하게 저해함.
            삼항연산자가 2개 연달아 나오면 정신줄 놓게됨..제거하는 방향으로 리팩 */}
          {isNavOpen && apply?.length === 0 && (
            <div className={styles.clubEmptyBox}>
              <p className={styles.message}>클럽이 없습니다.</p>
              <button className={styles.moveBtn}>
                <Link to="/club">멤버쉽 신청하러 가기</Link>
              </button>
            </div>
          )}
          {isNavOpen && (
            <div className={styles.applyCardList}>
              {/* <ApplyCardList />//민정 플젝이후 리팩: 컴포넌트 */}
              {apply?.map((club: MainApplyResType) => (
                <ApplyCard
                  key={club.title}
                  title={club.title}
                  summary={club.summary}
                  place={club.place}
                  times={club.times}
                />
              ))}
            </div>
          )}
          {!isNavOpen && <BookmarkListContainer />}
        </div>
      </div>
    </div>
  );
}
