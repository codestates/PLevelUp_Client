import React from 'react';
import styles from '../styles/pages/introduce_page/IntroducePage.module.scss';

const IntroducePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bannerWrapper}>
        {/* 민정님이 배너 넣으실 영역. 
          IntroducePage.module.scss에 임시 height 적어뒀습니다.
        */}
      </div>
      <div className={styles.introduceContainer}>
        <h1>프레벨업은 이런점이 특별해요!</h1>
        <br />
            다양한 사람들과 함께 하는 그룹 스터디
            다양한 사람들과의 관심있는 프로그래밍 분야 소통을 통해, 새로운 관점, 다름의 재미, 공감과 동질감의 힘을 알아갑니다.
        <br />
        <br />
        <h2>누구라도 클럽장이 되어 나만의 클럽을 만들수 있다!</h2>
        개발자를 꿈꾸거나 프로그래밍에 관심이 있고
        <br />
        학문을 탐구하고자 하는 사람들은
        모두 가장 힘들었던 점 중 하나로 '외로움'을 손에 꼽고 있습니다.
        프로그래밍을 공부하면서 '사람'과 공부하기 보다는
        <br />
        '컴퓨터' 혹은 '코드'와 공부한다는 느낌을
        강하게 받는것 입니다.
        <br />
        <br />
        때로는 내가 공부하는 이 길을 다 함께 증명하고 나아가고 싶은 경우가 있습니다.
        <br />
        <br />
        프레벨업에서 나만의 프로그래밍 스터디클럽을 신청하고 클럽장이 되어보세요.
        <br />
        모두가 함께 성장할 수 있습니다.
        <h1>우리의 모임 진행 순서는?</h1>
        <br />
        <br />
        시즌 시작 후, 단톡방을 개설하여 초대해드립니다.
        <br />
        함께 클럽장이 정한 클럽의 주제에 대해 토론하며 공부를 합니다.
        <br />
        모임 이후 에도 꾸준히 만남을 가져볼수도 있지요.
        <p className={styles.satisfaction}>프레벨업<br /> 멤버 만족도</p>
        <br />
        <br />
        <p className={styles.score}>4.5 / 5</p>
        <br />
        <br />
        <p>
          <p className={styles.emphasis}>"</p>내가 공부하는 방향이 옳은것인지 막막했고 누군가에게 확인받고 싶을때가 있었어요. 네이버 카페나 SNS에서는 모르는것만 여쭤보시지 함께 더 좋은 방향으로 나아가고자 하는 일은 드물었어요. 여기서는 모두가 얼굴을 마주보면서 같은 문제에 대해 의견을 나누고 진행해요. <p className={styles.emphasis}>"</p>
        </p>
        <p className={styles.student}>- 2021년 1~3월  시즌멤버 | 이O재 님</p>
        <br />
        <br />
        <p>
          <p className={styles.emphasis}>"</p><p>모두 낯선 환경에서도 적극적으로 이야기를 나누고 듣는 그 과정이 너무 좋았어요 ㅎㅎ 다음에 참가할 클럽도 너무 기대돼요. 프로그래밍이 더 이상 외롭지 않는 개발자라니! </p><p className={styles.emphasis}>"</p>
        </p>
        <p className={styles.student}>- 2020년 2~5월  시즌멤버 | 이O재 님</p>
        <br />
        <br />
        <p>
          <p className={styles.emphasis}>"</p><p>클럽장님 뿐만 아니라 모두의 열정이 한 곳으로 집중되는 느낌이에요. 각자 흩어져있던 불씨가 모여서 정말 큰일을 해낼 것 같아요 </p><p className={styles.emphasis}>"</p>
        </p>
        <p className={styles.student}>- 2020년 2~5월  시즌멤버 | 신O재 님</p>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default IntroducePage;
