import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainLogoutThunk } from '../../modules/user';
import MyPageForm from 'components/user/MyPageForm';
import { withRouter } from 'react-router';

export default withRouter(function MyPageContainer() {
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(mainLogoutThunk());
  };

  return <MyPageForm user={user} onLogout={onLogout} />;
});
