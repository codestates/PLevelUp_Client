import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FcMenu } from 'react-icons/fc';
import styles from '../../styles/common/Header.module.scss';
import { MasterIsLoginResType } from 'api/master/auth';
import { MainIsLoginResType } from 'api/main/auth';
import { Mobile } from '../../mediaQuery';

type HeaderProps = {
  user: MainIsLoginResType | MasterIsLoginResType | null;
  onLogout: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export default function Header({ user, onLogout }: HeaderProps) {
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMyPageOpen = () => {
    setIsMyPageOpen(!isMyPageOpen);
    setIsMenuOpen(false);
  };

  const handleMenuOpen = () => {
    console.log(isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    setIsMyPageOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 82) {
      setIsHeaderShow(false);
      setIsMyPageOpen(false);
      setIsMenuOpen(false);
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
            : `${styles.headerContainer} ${styles.active}`
        }
      >
        <div className={styles.navContainer}>
          <div className={styles.logoWrapper}>
            <div className={styles.menuBtn}>
              <FcMenu
                color="#3e3f48"
                size="30"
                className={styles.menuBtn}
                onClick={handleMenuOpen}
              />
            </div>
            <div className={styles.logo}>
              <Link to="/">
                <span
                  style={{
                    fill: '#5d3dbf',
                    fontFamily: 'Spoqa Han Sans Neo',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  P'Level Up
                </span>
              </Link>
            </div>
            <div>
              <FaUserCircle
                className={styles.mobileMyIcon}
                size="20"
                color="#c5c5c5"
                onClick={handleMyPageOpen}
              />
            </div>
          </div>
          <div className={styles.pcMenuList}>
            <div className={styles.pcMenuItem}>
              <Link className={styles.link} to="/club">
                모든 클럽 보기
              </Link>
            </div>
            <div className={styles.pcMenuItem}>
              <Link className={styles.link} to="/introduce">
                프로그램 소개
              </Link>
            </div>
            <div className={styles.pcVerIcon} onClick={handleMyPageOpen}>
              <FaUserCircle size="" color="#c5c5c5" className={styles.icon} />
              <div
                className={
                  isMyPageOpen
                    ? `${styles.MyPageContainer}`
                    : `${styles.MyPageContainer} ${styles.active}`
                }
              >
                {user ? (
                  user.id ? (
                    <div>
                      <div className={styles.dropDown}>
                        <Link className={styles.link} to="/mypage">
                          마이페이지
                        </Link>
                      </div>
                      <div className={styles.dropDown}>
                        <Link className={styles.link} to="/payment/history">
                          결제 내역
                        </Link>
                      </div>
                      <div className={styles.dropDown} onClick={onLogout}>
                        로그아웃
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={styles.dropDown}>
                        <Link className={styles.link} to="/master">
                          내 클럽 보기
                        </Link>
                      </div>
                      <div className={styles.dropDown} onClick={onLogout}>
                        로그아웃
                      </div>
                    </div>
                  )
                ) : (
                  <div>
                    <div className={styles.dropDown}>
                      <Link className={styles.link} to="/login">
                        일반 로그인
                      </Link>
                    </div>
                    <div className={styles.dropDown}>
                      <Link className={styles.link} to="/master/login">
                        클럽장 로그인
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.mobileWrapper}>
            <Mobile>
              <ul
                className={
                  isMenuOpen
                    ? `${styles.menuList} ${styles.active}`
                    : `${styles.menuList}`
                }
              >
                <li>
                  <Link className={styles.link} to="/club">
                    모든 클럽 보기
                  </Link>
                </li>
                <hr />
                <li>
                  <Link className={styles.link} to="/introduce">
                    프로그램 소개
                  </Link>
                </li>
                <hr />
                <li>
                  <Link className={styles.link} to="/help">
                    자주 묻는 질문
                  </Link>
                </li>
              </ul>

              <ul
                className={
                  isMyPageOpen
                    ? `${styles.menuList} ${styles.active}`
                    : `${styles.menuList}`
                }
              >
                {user ? (
                  user.id ? (
                    <div>
                      <li className={styles.dropDown}>
                        <Link className={styles.link} to="/mypage">
                          마이페이지
                        </Link>
                      </li>
                      <hr />
                      <li className={styles.dropDown}>
                        <Link className={styles.link} to="/payment/history">
                          결제 내역
                        </Link>
                      </li>
                      <hr />
                      <li className={styles.dropDown} onClick={onLogout}>
                        로그아웃
                      </li>
                    </div>
                  ) : (
                    <div>
                      <li className={styles.dropDown} onClick={onLogout}>
                        <Link className={styles.link} to="/master">
                          내 클럽 보기
                        </Link>
                      </li>
                      <li className={styles.dropDown} onClick={onLogout}>
                        로그아웃
                      </li>
                    </div>
                  )
                ) : (
                  <div>
                    <li className={styles.dropDown}>
                      <Link className={styles.link} to="/login">
                        일반 로그인
                      </Link>
                    </li>
                    <hr />
                    <li className={styles.dropDown}>
                      <Link className={styles.link} to="/master/login">
                        클럽장 로그인
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </Mobile>
          </div>
        </div>
      </div>
      <div className={styles.spacer} />
    </header>
  );
}
