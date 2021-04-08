import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import MyPage from 'pages/MyPage';
import MasterLoginPage from './pages/master/LoginPage';
import MasterSignUpPage from './pages/master/SignUpPage';
import HeaderContainer from './containers/commom/HeaderContainer';
import { useDispatch } from 'react-redux';
import { masterIsLoginThunk, masterTempSetUser } from './modules/master/user';
import { mainIsLoginThunk, mainTempSetUser } from './modules/main/user';

function App() {
  const dispatch = useDispatch();

  function loadUser() {
    try {
      const mainUser = localStorage.getItem('main');
      const masterUser = localStorage.getItem('master');
      if (!masterUser && !mainUser) return;
      if (mainUser) {
        dispatch(mainTempSetUser(JSON.parse(mainUser)));
        dispatch(mainIsLoginThunk());
      } else if (masterUser) {
        dispatch(masterTempSetUser(JSON.parse(masterUser)));
        dispatch(masterIsLoginThunk());
      }
    } catch (e) {
      console.log('localStorage is not working');
    }
  }
  loadUser();

  return (
    <>
      <HeaderContainer />
      <Switch>
        <Route exact path="/master/login" component={MasterLoginPage} />
        <Route exact path="/master/sign-up" component={MasterSignUpPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </>
  );
}

export default App;
