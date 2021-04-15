import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClubCard from '../common/ClubCard';
import styles from '../../styles/pages/landing_page/SlickClubCard.module.scss';
import { Link } from 'react-router-dom';

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#ffd7d2',
        right: '-35px',
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#ffd7d2',
        left: '-35px',
      }}
      onClick={onClick}
    />
  );
}

export default function SlickClubCard({ data, name, bookmark }: any) {
  const settings = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 4, // 한 줄에 보여지는 카드 수
    // slidesToScroll: 4, //한 번에 넘어가는 카드 수
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          arrows: true,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.container}>
      <h2>{name} </h2>
      <Slider {...settings}>
        {data.map((club: any) => {
          return <ClubCard club={club} key={club.id} bookmark={bookmark} />;
        })}
      </Slider>
    </div>
  );
}
