import React from 'react';
import './styles/App.css';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MyPage from 'pages/MyPage';

function App() {
  return (
    <>
      <header className="App-header">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mypage" component={MyPage} />
      </header>
    </>
  );
}

export default App;
