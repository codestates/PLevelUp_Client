import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { masterIsLoginThunk, masterTempSetUser } from './modules/master/user';
import { mainIsLoginThunk, mainTempSetUser } from './modules/main/user';

import ModifyUserInfo from './pages/Modify_userInfoPage';
import LandingPage from './pages/LandingPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'pages/DetailPage';
import IntronducePage from 'pages/IntroducePage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import MyPage from 'pages/MyPage';
import Footer from 'components/common/Footer';
import Header from 'containers/commom/HeaderContainer';
import ScrollToTop from 'containers/commom/ScrollToTop';
import MasterLoginPage from './pages/master/LoginPage';
import MasterSignUpPage from './pages/master/SignUpPage';

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
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/master/login" component={MasterLoginPage} />
        <Route exact path="/master/sign-up" component={MasterSignUpPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/introduce" component={IntronducePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/" component={ModifyUserInfo} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
