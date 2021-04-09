import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { masterIsLoginThunk, masterTempSetUser } from './modules/master/user';

import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import IntronducePage from 'pages/IntroducePage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MyPage from 'pages/MyPage';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import ScrollToTop from 'containers/commom/ScrollToTop';
import MasterLoginPage from './pages/master/LoginPage';
import MasterSignUpPage from './pages/master/SignUpPage';

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
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/master/login" component={MasterLoginPage} />
        <Route exact path="/master/sign-up" component={MasterSignUpPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/introduce" component={IntronducePage} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
