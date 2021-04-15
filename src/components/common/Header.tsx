import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import styles from '../../styles/common/Header.module.scss';

// TODO: 민정 any 대신 타입 지정 할 것, 메인 유저 마스터 유저 구분하여 다른 헤더로 구성할 것
export default function Header({ user, onLogout }: any) {
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  const handleMyPageOpen = () => {
    setIsMyPageOpen(!isMyPageOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 82) {
      setIsHeaderShow(false);
    } else {
      setIsHeaderShow(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <div
        className={
          isHeaderShow
            ? `${styles.headerContainer}`
            : `${styles.hideHeaderContainer}`
        }
      >
        <div className={styles.navContainer}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>
              <svg
                width="100%"
                style={{ margin: '0px' }}
                overflow="hidden"
                height="100%"
                version="1.1"
                viewBox="0 0 88 14"
                xmlns="http://www.inkscape.org/namespaces/inkscape"
              >
                <Link to="/">
                  <text
                    style={{
                      fill: '#ee8205',
                      fontFamily: 'Spoqa Han Sans Neo',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    P'Level Up
                  </text>
                </Link>
              </svg>
            </div>
          </div>
          <ul className={styles.menuList}>
            <li>
              <Link to="/club">모든 클럽 보기</Link>
            </li>
            <hr />
            <li>
              <Link to="/introduce">프로그램 소개</Link>
            </li>
            <hr />
            {user ? (
              <li className={styles.pcVerIcon} onClick={handleMyPageOpen}>
                <FaUserCircle
                  size="20"
                  color="#c5c5c5"
                  className={styles.icon}
                />
                <div
                  className={
                    isMyPageOpen
                      ? `${styles.MyPageContainer}`
                      : `${styles.MyPageNone}`
                  }
                >
                  <div className={styles.dropDown}>
                    <Link to="/MyPage">마이페이지</Link>
                  </div>
                  <div className={styles.dropDown} onClick={onLogout}>
                    로그아웃
                  </div>
                </div>
              </li>
            ) : (
              <li className={styles.pcVerIcon} onClick={handleMyPageOpen}>
                <FaUserCircle
                  size="20"
                  color="#c5c5c5"
                  className={styles.icon}
                />
                <div
                  className={
                    isMyPageOpen
                      ? `${styles.MyPageContainer}`
                      : `${styles.MyPageNone}`
                  }
                >
                  <div className={styles.dropDown}>
                    <Link to="/login">일반 로그인</Link>
                  </div>
                  <div className={styles.dropDown}>
                    <Link to="/master/login">클럽장 로그인</Link>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
