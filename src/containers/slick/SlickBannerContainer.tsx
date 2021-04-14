import React, { useState } from 'react';
import SlickBanner from '../../components/slick/SlickBanner';

export default function SlickBannerContainer() {
  const [banner, setBanner] = useState([
    {
      id: 1,
      url:
        'https://image.trevari.co.kr/file/01c1283e-64c9-4689-9c99-b8200c3ab060.book-pc.png',
    },
    {
      id: 2,
      url:
        'https://image.trevari.co.kr/file/bec681f0-c194-4c91-b275-1681aa3e6049.toojaPC.png',
    },
    {
      id: 3,
      url:
        'https://image.trevari.co.kr/file/97906a40-5487-4a4b-bcc2-027055dbc4e4.career-pm%28PC%29.png',
    },
  ]);
  return <SlickBanner data={banner} />;
}
