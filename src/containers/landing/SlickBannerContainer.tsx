import React, { useState } from 'react';
import SlickBanner from '../../components/landing/SlickBanner';
import { bannerData } from '../../asset/data/dummy';
export default function SlickBannerContainer() {
  const [banner, setBanner] = useState(bannerData);
  return <SlickBanner data={banner} />;
}
