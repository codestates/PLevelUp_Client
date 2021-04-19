import BookmarkList from '../../components/user/BookmarkList';
import List from '../../components/club/list/List';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../modules';
import { MainClubListResType, MainClubReadResType } from '../../api/main/club';
import mainListAsync from 'modules/club/list';
import { useDispatch, useSelector } from 'react-redux';
import { mainGetBookmarkListThunk } from '../../modules/club/list';

export default function BookmarkListContainer() {
  const dispatch = useDispatch();
  const { clubs } = useSelector(({ mainListAsync }: RootState) => ({
    clubs: mainListAsync.clubs.data,
  }));

  useEffect(() => {
    dispatch(mainGetBookmarkListThunk());
  }, [dispatch]);

  return <List clubs={clubs} />;
}
