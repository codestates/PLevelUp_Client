import React from 'react';
import './styles/App.scss';
import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MyPage from 'pages/MyPage';
import MasterLoginPage from './pages/master/LoginPage';
import MasterSignUpPage from './pages/master/SignUpPage';
import { useDispatch } from 'react-redux';
import { masterIsLoginThunk, masterTempSetUser } from './modules/master/user';

function App() {
  const dispatch = useDispatch();

  function loadUser() {
    try {
      const user = localStorage.getItem('master');
      if (!user) return;

      dispatch(masterTempSetUser(JSON.parse(user)));
      dispatch(masterIsLoginThunk());
    } catch (e) {
      console.log('localStorage is not working');
    }
  }
  loadUser();

  return (
    <>
      <Route exact path="/master/login" component={MasterLoginPage} />
      <Route exact path="/master/sign-up" component={MasterSignUpPage} />
      <Route exact path="/list" component={ListPage} />
      <Route exact path="/detail" component={DetailPage} />
      <Route exact path="/payment" component={PaymentPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/" component={LandingPage} />
    </>
  );
}

export default App;
