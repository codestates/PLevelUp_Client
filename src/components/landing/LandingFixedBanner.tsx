import React from 'react';
import styles from '../../styles/pages/landing_page/LandingPage.module.scss';
import powerImg from '../../asset/power.png';

import { Link } from 'react-router-dom';

export default function LandingFixedBannerOne() {
    return (
        <div className={styles.coronaWrapperBanner}>
            <Link to={`/club/list`} className={styles.LinkBanner}>
                <div className={styles.bannerContainer}>
                    <div className={styles.bannerSubTitle}>
                        {`안전하게 만나요  `}
                        <img className={styles.bannerSubImg} src={powerImg} />
                    </div>
                    <div className={styles.bannerTitle}>사회적 거리두기 단계별 운영방침</div>
                </div>
            </Link>
        </div>
    );
}