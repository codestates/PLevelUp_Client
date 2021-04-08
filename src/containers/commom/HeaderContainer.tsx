import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { masterLogoutThunk } from '../../modules/master/user';

export default function HeaderContainer() {
  const { data: user } = useSelector(({ masterUser }: RootState) => ({
    data: masterUser.user?.data,
  }));

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(masterLogoutThunk());
  };

  return <Header user={user} onLogout={onLogout} />;
}
