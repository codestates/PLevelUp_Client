import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/pages/landing_page/SlickBanner.module.scss';
import { Link } from 'react-router-dom';

export default function SlickBanner({ data }: any) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };
  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {data.map((banner: any) => {
          return (
            <div className={styles.imgBox}>
              <Link to="/list">
                <img className={styles.img} src={banner.url} />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
