import Header from '../../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { masterLogoutThunk } from '../../modules/master/user';
import { mainLogoutThunk } from '../../modules/user';

export default function HeaderContainer() {
  const { data: user } = useSelector(({ masterUser, mainUser }: RootState) => ({
    data: masterUser.user?.data || mainUser.user?.data,
  }));

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(masterLogoutThunk());
    dispatch(mainLogoutThunk());
  };

  return <Header user={user} onLogout={onLogout} />;
}
