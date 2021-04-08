import React from 'react';
import './styles/App.scss';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import IntronducePage from 'pages/IntroducePage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MyPage from 'pages/MyPage';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ScrollToTop from 'containers/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/introduce" component={IntronducePage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
