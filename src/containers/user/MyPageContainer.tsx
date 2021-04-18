import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainLogoutThunk } from '../../modules/user';
import MyPageForm from 'components/user/MyPageForm';
import { withRouter } from 'react-router';

export default withRouter(function MyPageContainer() {
  const dispatch = useDispatch();
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  //등록한 클럽 정보

  //결제 내역 정보

  //북마크한 클럽 정보

  const onLogout = () => {
    dispatch(mainLogoutThunk());
  };

  return <MyPageForm user={user} onLogout={onLogout} />;
});
