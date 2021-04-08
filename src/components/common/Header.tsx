import React from 'react';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import styles from '../../styles/common/Responsive.module.scss';
import { useMediaQuery } from 'react-responsive';

export default function Header({ user, onLogout }: any) {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
  return (
    <>
      {isPc && (
        <>
          <div className={styles.headerContainer}>
            <Responsive>
              <Link to="/" className={styles.logo}>
                P`LevelUP
              </Link>
              {user ? (
                <div className={styles.right}>
                  {/* <UserInfo>{user.username}</UserInfo> */}
                  <button onClick={onLogout}>로그아웃</button>
                </div>
              ) : (
                <div className={styles.right}>
                  <Link to="/login">로그인</Link>
                </div>
              )}
            </Responsive>
          </div>
          <div className={styles.spacer}>1</div>
        </>
      )}
      {isMobile && (
        <>
          <div className={styles.headerContainer}>
            <Responsive>
              <Link to="/" className={styles.logo}>
                P`LevelUP
              </Link>
              {user ? (
                <div className={styles.right}>
                  {/* <UserInfo>{user.username}</UserInfo> */}
                  <button onClick={onLogout}>모바일로그아웃</button>
                </div>
              ) : (
                <div className={styles.right}>
                  <Link to="/login">모바일로그인</Link>
                </div>
              )}
            </Responsive>
          </div>
          <div className={styles.spacer}>1</div>
        </>
      )}
    </>
  );
}
