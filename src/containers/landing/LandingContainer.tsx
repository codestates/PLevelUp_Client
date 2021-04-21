import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import LandingTemplate from '../../components/landing/LandingTemplate';
import { mainLandingListThunk } from '../../modules/landing';
import ErrorView from '../../components/common/ErrorView';
import LoadingView from '../../components/common/LoadingView';
export default function LandingContainer() {
  const dispatch = useDispatch();
  const { clubsList, error, loading } = useSelector(
    ({ mainLandingAsync }: RootState) => ({
      clubsList: mainLandingAsync.data,
      error: mainLandingAsync.error,
      loading: mainLandingAsync.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainLandingListThunk());
  }, [dispatch]);

  if (error) {
    return <ErrorView />;
  }

  if (loading || !clubsList) {
    return <LoadingView />;
  }

  const landingClubsList = [];

  if (clubsList) {
    landingClubsList.push({
      clubs: clubsList.onlineList,
      to: '/club?place=온라인',
      title: '온라인에서 만나요',
      type: 'online',
    });
    landingClubsList.push({
      clubs: clubsList.newList,
      to: '/club?filter=isNew',
      title: '새로운에서 만나요',
      type: 'new',
    });
    landingClubsList.push({
      clubs: clubsList.gangnamList,
      to: '/club?place=강남',
      title: '강남에서 만나요',
      type: 'gangnam',
    });
    landingClubsList.push({
      clubs: clubsList.fourLimitList,
      to: '/club?limitNumber=4',
      title: '4명이서 만나요',
      type: 'fourNumber',
    });
  }
  return <LandingTemplate landingClubsList={landingClubsList} />;
}
