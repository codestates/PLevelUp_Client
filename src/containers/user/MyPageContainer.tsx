import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainLogoutThunk } from '../../modules/user';
import MyPageForm from 'components/user/MyPageForm';
import { withRouter } from 'react-router';
import {
  mainApplyAsync,
  mainApplyThunk,
  mainApplyUnload,
} from '../../modules/apply';
import { useEffect } from 'react';

export default withRouter(function MyPageContainer() {
  const dispatch = useDispatch();
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const { data: apply, error, loading } = useSelector(
    ({ mainApplyAsync }: RootState) => ({
      data: mainApplyAsync.apply.data,
      error: mainApplyAsync.apply.error,
      loading: mainApplyAsync.apply.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainApplyThunk());
  }, []);

  const onLogout = () => {
    dispatch(mainLogoutThunk());
  };

  return <MyPageForm user={user} onLogout={onLogout} apply={apply} />;
});
