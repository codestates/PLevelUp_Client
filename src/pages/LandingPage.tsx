import CounterHooks from 'components/CounterHooks';
import ReducerSample from 'components/ReducerSample';
import CounterContainer from 'containers/CounterContainer';
import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1> 랜딩페이지 </h1>
      <p>hooks로 만든 Counter Sample </p>
      <CounterHooks />
      <p>presentation + container (props)로 만든 Counter Sample </p>
      <CounterContainer />
      <p>리듀서 작동 테스트</p>
      <ReducerSample />
    </div>
  );
};

export default LandingPage;
