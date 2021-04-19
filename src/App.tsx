import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { masterIsLoginThunk, masterTempSetUser } from './modules/master/user';
import { mainIsLoginThunk, mainTempSetUser } from './modules/user';

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
import MasterClubEditPage from './pages/master/ClubEditPage';
import MasterClubReadPage from './pages/master/ClubReadPage';
import MasterClubListPage from './pages/master/ClubListPage';
import ClubReadPage from './pages/ClubReadPage';
import ClubListPage from './pages/ClubListPage';
import LandingPage from 'pages/LandingPage';
import MyPageChangePasswordPage from './pages/myPage/MyPageChangePasswordPage';

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
        <Route exact path="/club/:clubId" component={ClubReadPage} />
        <Route exact path="/club" component={ClubListPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/introduce" component={IntroducePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route
          exact
          path="/mypage/changepassword"
          component={MyPageChangePasswordPage}
        />
        <Route exact path="/master/edit" component={MasterClubEditPage} />
        <Route exact path="/master/:clubId" component={MasterClubReadPage} />
        <Route exact path={['/master/']} component={MasterClubListPage} />
        <Route exact path="/" component={LandingPage} /> {/* 임시 */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
