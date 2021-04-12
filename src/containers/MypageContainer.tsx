import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../modules';
import { masterLogoutThunk } from '../modules/master/user';
import { mainLogoutThunk } from '../modules/user';
import MypageForm from 'components/MypageForm';
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

  return <MypageForm user={user} onLogout={onLogout} />;
});
