import React from 'react';
import './styles/App.scss';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MyPage from 'pages/MyPage';
<<<<<<< Updated upstream
=======

import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import ScrollToTop from 'containers/commom/ScrollToTop';
import MasterLoginPage from './pages/master/LoginPage';
import MasterSignUpPage from './pages/master/SignUpPage';
>>>>>>> Stashed changes

function App() {
  return (
    <>
<<<<<<< Updated upstream
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/list" component={ListPage} />
      <Route exact path="/detail" component={DetailPage} />
      <Route exact path="/payment" component={PaymentPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/mypage" component={MyPage} />
=======
      <ScrollToTop />
      <Header />
      <Switch>
        {/* <Route exact path="/master/login" component={MasterLoginPage} />
        <Route exact path="/master/sign-up" component={MasterSignUpPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/introduce" component={IntronducePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/mypage" component={MyPage} /> */}
        <Route exact path="/" component={MyPage} />
      </Switch>
      <Footer />
>>>>>>> Stashed changes
    </>
  );
}

export default App;
