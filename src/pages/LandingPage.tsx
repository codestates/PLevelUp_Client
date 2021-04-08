import React from 'react';
import styles from '../styles/pages/landing_page/LandingPage.module.scss';
import CounterHooks from 'components/CounterHooks';
import ReducerSample from 'components/ReducerSample';
import CounterContainer from 'containers/CounterContainer';
import HeaderContainer from '../containers/commom/HeaderContainer';

const LandingPage = () => {
  return (
    <>
      <HeaderContainer />
      <div className={styles.wrapper}>
        <h1> 랜딩페이지 </h1>
        <p>hooks로 만든 Counter Sample </p>
        <CounterHooks />
        <p>presentation + container (props)로 만든 Counter Sample </p>
        <CounterContainer />
        <p>리듀서 작동 테스트</p>
        <ReducerSample />
      </div>
    </>
  );
};

export default LandingPage;
