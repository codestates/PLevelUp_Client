import React, { MouseEventHandler } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from '../../styles/pages/landing_page/LandingPage.module.scss';
import { Link } from 'react-router-dom';

function SampleNextArrow(props: {
  className?: string;
  style?: Object;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        right: '3%',
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props: {
  className?: string;
  style?: Object;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        left: '3%',
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

export type bannerDataType = {
  id: number;
  url: string;
};

export default function SlickBanner({ data }: { data: bannerDataType[] }) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className={styles.bannerContainer}>
      <Slider {...settings} className={styles.slider}>
        {data.map((banner: bannerDataType) => {
          return (
            <div className={styles.imgBox} key={banner.id}>
              <Link to="/list">
                <img className={styles.img} src={banner.url} alt="bannerImg" />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
