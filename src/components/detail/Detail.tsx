import React from 'react';


import styles from '../../styles/pages/Detail_page/DetailPage.module.scss';
import { Mobile, PC } from "../../mediaQuery"



export default function DetailPage() {


    return (
        <div>
            <body className={styles.wrapper}>
                <div className={styles.detailPage}>
                    <div className={styles.clubDetailContainer}>
                        <div className={styles.clubInfoCard}>
                            <div className={styles.clubCardContents}>
                                <div className={styles.clubCardPC}>
                                    <PC>
                                        <div className={styles.floatingCard}>
                                            <div className={styles.cardImgWrap}>
                                                {/* 임시 이미지 입니다. */}
                                                <img className={styles.cardImg} alt="카드 이미지 영역입니다." />
                                            </div>
                                            <div className={styles.cardContentsWrap}>
                                                <div className={styles.floatingClubName}>
                                                    <span className={styles.clubTitle}>
                                                        {/* 임시 더미 데이터 작성했습니다. */}
                                                        씀-파도
                                                        <span className={styles.badges}>
                                                            <span className={styles.tagSolid}>
                                                                {/* 임시 더미 데이터 작성했습니다. */}
                                                                    마감임박
                                                                </span>
                                                        </span>
                                                    </span>
                                                </div>

                                                <div className={styles.placeTimeContainer}>
                                                    {/* 임시 더미 데이터 작성했습니다. */}
                                                    강남 아지트
                                                    {/*  */}
                                                    |
                                                    {/*  */}
                                                    {/*  */}
                                                    매달 세 번째 목요일
                                                    {/*  */}
                                                    <br></br>
                                                    첫 모임일
                                                    {/*  */}
                                                    {/*  */}
                                                    4.15(목)
                                            </div>
                                                <div className={styles.tagsWrap}></div>
                                                <div className={styles.monthlyPrice}>
                                                    {/* 임시 더미 데이터 작성했습니다. */}
                                                    월
                                                    {/*  */}
                                                    52,500원
                                                </div>
                                            </div>
                                            <div className={styles.floatingCardBtn}>
                                                <div className={styles.fixedAppBtnBox}>
                                                    <div className={styles.fixedAppBtn}>
                                                        <button className={styles.fixedAppBtn1}>
                                                            {/* 임시 svg 입니다 */}
                                                            <svg width="24" height="20" viewBox="0 0 24 20">
                                                                <path fill="#FF7700" fill-opacity=".6" fill-rule="nonzero" d="M11.934 19.795c1.47-2.715 4.423-5.452 8.86-8.21 2.072-1.259 3.107-2.91 3.107-4.954a7.11 7.11 0 0 0-.44-2.478 6.181 6.181 0 0 0-1.323-2.078A6.59 6.59 0 0 0 20.206.668a5.385 5.385 0 0 0-2.278-.483c-.819 0-1.578.161-2.278.483a6.37 6.37 0 0 0-1.953 1.407 6.23 6.23 0 0 0-1.301 2.078 6.505 6.505 0 0 0-.462 2.478c0-.896-.147-1.722-.441-2.478a6.23 6.23 0 0 0-1.302-2.078A6.37 6.37 0 0 0 8.238.668 5.385 5.385 0 0 0 5.96.185c-.819 0-1.578.161-2.278.483A6.59 6.59 0 0 0 1.75 2.075 6.181 6.181 0 0 0 .428 4.153a7.11 7.11 0 0 0-.441 2.478c0 2.015 1.036 3.667 3.107 4.955 4.437 2.757 7.384 5.494 8.84 8.21z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                        <div className={styles.applyBtn}>
                                                            <button className={styles.fixedAppBtn2}>
                                                                {/* 임시 더미 데이터 작성했습니다. */}
                                                                2자리 남았어요! 지금 시작
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PC>
                                </div>
                                {/* ---mobile 영역입니다. --- */}
                                <div className={styles.clubCardPC}>
                                    <Mobile>
                                        <div className={styles.floatingCard}>
                                            <div className={styles.cardImgWrap}>
                                                {/* 임시 이미지 입니다. */}
                                                <img className={styles.cardImg} alt="카드 이미지 영역입니다." />
                                            </div>
                                            <div className={styles.cardContentsWrap}>
                                                <div className={styles.floatingClubName}>
                                                    <span className={styles.clubTitle}>
                                                        {/* 임시 더미 데이터 작성했습니다. */}
                                                        씀-파도
                                                        <span className={styles.badges}>
                                                            <span className={styles.tagSolid}>
                                                                {/* 임시 더미 데이터 작성했습니다. */}
                                                                    마감임박
                                                                </span>
                                                        </span>
                                                    </span>
                                                </div>

                                                <div className={styles.placeTimeContainer}>
                                                    {/* 임시 더미 데이터 작성했습니다. */}
                                                    강남 아지트
                                                    {/*  */}
                                                    |
                                                    {/*  */}
                                                    {/*  */}
                                                    매달 세 번째 목요일
                                                    {/*  */}
                                                    <br></br>
                                                    첫 모임일
                                                    {/*  */}
                                                    {/*  */}
                                                    4.15(목)
                                            </div>
                                                <div className={styles.tagsWrap}></div>
                                                <div className={styles.monthlyPrice}>
                                                    {/* 임시 더미 데이터 작성했습니다. */}
                                                    월
                                                    {/*  */}
                                                    52,500원
                                                </div>
                                            </div>
                                            <div className={styles.floatingCardBtn}>
                                                <div className={styles.fixedAppBtnBox}>
                                                    <div className={styles.fixedAppBtn}>
                                                        <button className={styles.fixedAppBtn1}>
                                                            {/* 임시 svg 입니다 */}
                                                            <svg width="24" height="20" viewBox="0 0 24 20">
                                                                <path fill="#FF7700" fill-opacity=".6" fill-rule="nonzero" d="M11.934 19.795c1.47-2.715 4.423-5.452 8.86-8.21 2.072-1.259 3.107-2.91 3.107-4.954a7.11 7.11 0 0 0-.44-2.478 6.181 6.181 0 0 0-1.323-2.078A6.59 6.59 0 0 0 20.206.668a5.385 5.385 0 0 0-2.278-.483c-.819 0-1.578.161-2.278.483a6.37 6.37 0 0 0-1.953 1.407 6.23 6.23 0 0 0-1.301 2.078 6.505 6.505 0 0 0-.462 2.478c0-.896-.147-1.722-.441-2.478a6.23 6.23 0 0 0-1.302-2.078A6.37 6.37 0 0 0 8.238.668 5.385 5.385 0 0 0 5.96.185c-.819 0-1.578.161-2.278.483A6.59 6.59 0 0 0 1.75 2.075 6.181 6.181 0 0 0 .428 4.153a7.11 7.11 0 0 0-.441 2.478c0 2.015 1.036 3.667 3.107 4.955 4.437 2.757 7.384 5.494 8.84 8.21z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                        <div className={styles.applyBtn}>
                                                            <button className={styles.fixedAppBtn2}>
                                                                {/* 임시 더미 데이터 작성했습니다. */}
                                                                2자리 남았어요! 지금 시작
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Mobile>
                                </div>
                            </div>


                        </div>
                        {/* 위는 카드 영역, 여기부터는 클럽장이 작성한 내용영역 입니다. */}
                        <div className={styles.infoContainer}>
                            <div className={styles.infoWrap}>
                                <div className={styles.infoContents}>

                                    <div className={styles.infoMainTitle}>
                                        {/* 임시 더미 데이터 작성했습니다. */}
                                            제목입니다
                                        </div>

                                    <div className={styles.infoMainContents}>
                                        <div className={styles.infoMainContainer}>
                                            {/* 클럽장이 직접 쓴 글들이 한 줄씩 나열되는 영역입니다. */}
                                                내용입니다
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>

    );
};

