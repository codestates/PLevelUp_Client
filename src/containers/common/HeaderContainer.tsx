import Header from '../../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { masterLogoutThunk } from '../../modules/master/user';
import { mainLogoutThunk } from '../../modules/user';
import { withRouter } from 'react-router-dom';
import React from 'react';

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

  if (!user) return <div />; // TODO: 1 인수 user 없을 때 처리 할 것, 이해 안 될 시 TODO 1 으로 질문 !!

  return <Header user={user} onLogout={onLogout} />;
});
