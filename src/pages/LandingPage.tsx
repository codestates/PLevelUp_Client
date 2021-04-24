import React from 'react';
import SlickBannerContainer from '../containers/landing/SlickBannerContainer';
import LandingContainer from '../containers/landing/LandingContainer';
import LandingFixedBanner from '../components/landing/LandingFixedBanner';
import LinktoListPageButton from '../components/landing/LinktoListPageButton';
const LandingPage = () => {
  return (
    <>
      <SlickBannerContainer />
      <LandingContainer />
      <LinktoListPageButton />
      <LandingFixedBanner />
    </>
  );
};

export default LandingPage;
