import Header from '../../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { masterLogoutThunk } from '../../modules/master/user';
import { mainLogoutThunk } from '../../modules/user';
import { withRouter } from 'react-router-dom';

export default withRouter(function HeaderContainer({ history }) {
  const { data: user } = useSelector(({ masterUser, mainUser }: RootState) => ({
    data: masterUser.user?.data || mainUser.user?.data,
  }));

  const dispatch = useDispatch();
  const onLogout = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(masterLogoutThunk());
    dispatch(mainLogoutThunk());
    history.push('/');
  };

  return <Header user={user} onLogout={onLogout} />;
});
