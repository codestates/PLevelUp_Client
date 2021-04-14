import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { masterIsLoginThunk, masterTempSetUser } from './modules/master/user';
import { mainIsLoginThunk, mainTempSetUser } from './modules/user';

import ChangePasswordPage from './pages/ChangePasswordPage';
import ListPage from 'pages/ListPage';
import DetailPage from 'components/detail/Detail';
import IntroducePage from 'pages/IntroducePage';
import PaymentPage from 'pages/PaymentPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import MyPage from 'pages/MyPage';
import Footer from 'components/common/Footer';
import ScrollToTop from 'containers/common/ScrollToTop';
import MasterLoginPage from './pages/master/LoginPage';
import MasterSignUpPage from './pages/master/SignUpPage';
import HeaderContainer from './containers/common/HeaderContainer';
import ClubEditPage from './pages/master/ClubEditPage';

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
      <HeaderContainer />
      <Switch>
        <Route exact path="/master/login" component={MasterLoginPage} />
        <Route exact path="/master/signup" component={MasterSignUpPage} />
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/introduce" component={IntroducePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/update" component={ChangePasswordPage} />
        <Route exact path="/master/edit" component={ClubEditPage} />
        <Route exact path="/" component={DetailPage} /> {/* 임시로 '/'로 해놓았습니다.*/}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
