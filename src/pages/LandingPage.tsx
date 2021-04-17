import React from 'react';
import styles from '../styles/pages/landing_page/LandingPage.module.scss';
import SlickBannerContainer from '../containers/landing/SlickBannerContainer';
import SlickClubCardContainer from '../containers/landing/SlickClubCardContainer';
const LandingPage = () => {
  return (
    <>
      <SlickBannerContainer />
      <SlickClubCardContainer />
    </>
  );
};

export default LandingPage;
