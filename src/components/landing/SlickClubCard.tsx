import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClubCardContainer from '../../containers/common/ClubCardContainer';
import styles from '../../styles/pages/landing_page/LandingPage.module.scss';
import { MainClubListResType, MainClubReadResType } from 'api/main/club';
import { Link } from 'react-router-dom';

function SampleNextArrow(props: any) {
  //슬릭배너 props 나와있지 않아 타입알기 어렵다.
  const { className, style, onClick } = props;
  return (
    <>
      <div
        className={`${className} ${styles.sample}`}
        style={{
          ...style,
          display: 'block',
          background: 'white',
          right: '-5px',
          width: '1px',
        }}
        onClick={onClick}
      >
        <div
          className="slick-next"
          style={{
            ...style,
            color: 'red',
          }}
          onClick={onClick}
        ></div>
      </div>
    </>
  );
}
function SamplePrevArrow(props: any) {
  //슬릭배너 props 나와있지 않아 타입알기 어렵다.
  const { className, style, onClick } = props;
  console.log(props);
  return (
    <div>
      <div
        className={`${className} ${styles.sample}`}
        style={{
          ...style,
          display: 'block',
          background: 'white',
          color: 'red',
          left: '-5px',
          width: '1px',
        }}
        onClick={onClick}
      >
        <div
          className="slick-prev"
          style={{
            ...style,
            color: 'red',
          }}
        ></div>
      </div>
    </div>
  );
}

export default function SlickClubCard({
  data,
  type,
}: {
  data: MainClubListResType;
  type: string;
}) {
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
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className={styles.slider}>
      {data.map((club, index) => {
        return (
          <div className={styles.cardContainer} key={`${type}-${index}`}>
            <ClubCardContainer club={club} isMain={true} />
          </div>
        );
      })}
    </Slider>
  );
}
