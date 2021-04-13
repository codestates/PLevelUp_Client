import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainLogoutThunk } from '../../modules/user';
import MypageForm from 'components/user/MypageForm';
import { withRouter } from 'react-router';

export default withRouter(function MypageContainer() {
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(mainLogoutThunk());
  };

  return <MypageForm user={user} onLogout={onLogout} />;
});
