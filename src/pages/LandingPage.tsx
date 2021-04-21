import React from 'react';
import SlickBannerContainer from '../containers/landing/SlickBannerContainer';
import LandingContainer from '../containers/landing/LandingContainer';
import LandingFixedBanner from '../components/landing/LandingFixedBanner';

const LandingPage = () => {
  return (
    <>
      <SlickBannerContainer />
      <LandingContainer />
      <LandingFixedBanner />
    </>
  );
};

export default LandingPage;
