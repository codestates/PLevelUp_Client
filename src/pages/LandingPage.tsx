import React from 'react';
import styles from '../styles/pages/landing_page/LandingPage.module.scss';
import SlickBannerContainer from '../containers/slick/SlickBannerContainer';
import SlickClubListContainer from '../containers/slick/SlickClubListContainer';
const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <SlickBannerContainer />
      <SlickClubListContainer />
    </div>
  );
};

export default LandingPage;
