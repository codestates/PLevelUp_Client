import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import styles from '../styles/common/Header.module.scss';

export default function Header({ user, onLogout }: any) {
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  const handleMypageOpen = () => {
    setIsMypageOpen(!isMypageOpen);
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
              <Link to="/list">모든 클럽 보기</Link>
            </li>
            <hr />
            <li>
              <Link to="/introduce">프로그램 소개</Link>
            </li>
            <hr />
            {user ? (
              <li className={styles.pcVerIcon} onClick={handleMypageOpen}>
                <FaUserCircle
                  size="20"
                  color="#c5c5c5"
                  className={styles.icon}
                />
                <div
                  className={
                    isMypageOpen
                      ? `${styles.mypageContainer}`
                      : `${styles.mypageNone}`
                  }
                >
                  <div className={styles.dropDown}>
                    <Link to="/mypage">마이페이지</Link>
                  </div>
                  <div className={styles.dropDown} onClick={onLogout}>
                    로그아웃
                  </div>
                </div>
              </li>
            ) : (
              <li className={styles.pcVerIcon} onClick={handleMypageOpen}>
                <FaUserCircle
                  size="20"
                  color="#c5c5c5"
                  className={styles.icon}
                />
                <div
                  className={
                    isMypageOpen
                      ? `${styles.mypageContainer}`
                      : `${styles.mypageNone}`
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
