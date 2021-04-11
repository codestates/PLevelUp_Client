import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../modules';
import { masterLogoutThunk } from '../modules/master/user';
import { mainLogoutThunk } from '../modules/main/user';
import MyPage from 'pages/MyPage';
import { withRouter } from 'react-router';

export default withRouter(function MypageContainer() {
  const { data: user } = useSelector(({ masterUser, mainUser }: RootState) => ({
    data: masterUser.user?.data || mainUser.user?.data,
  }));

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(masterLogoutThunk());
    dispatch(mainLogoutThunk());
  };

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('master', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return <MyPage />;
});
