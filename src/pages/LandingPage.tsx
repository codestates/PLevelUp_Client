import React from 'react';
import styles from '../styles/pages/landing_page/LandingPage.module.scss';
import SlickBannerContainer from '../containers/landing/SlickBannerContainer';
import SlickClubCardContainer from '../containers/landing/SlickClubCardContainer';
import LandingFixedBanner from '../components/landing/LandingFixedBanner';

const LandingPage = () => {
  return (
    <>
      <SlickBannerContainer />
      <SlickClubCardContainer />
      <LandingFixedBanner />
    </>
  );
};

export default LandingPage;
