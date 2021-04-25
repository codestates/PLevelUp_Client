import React, { useState } from 'react';
import SlickBanner from '../../components/landing/SlickBanner';
import { infoBanner } from '../../asset/data/dummy';

export default function IntroduceBannerContainer() {
  const [banner, setBanner] = useState(infoBanner);
  return <SlickBanner data={banner} />;
}
