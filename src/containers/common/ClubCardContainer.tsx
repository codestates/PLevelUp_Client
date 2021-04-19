import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  addBookmarkThunk,
  removeBookmarkThunk,
} from '../../modules/club/bookmark';
import { withRouter } from 'react-router-dom';
import ClubCard from '../../components/common/ClubCard';

//TODD: isbookmarked 리팩토링
//TODD: any 타입 변경 해야함
export default withRouter(function ClubCardContainer({
  club,
  history,
  isMain,
}: any) {
  const dispatch = useDispatch();
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));
  const onClickCard = (e: any) => {
    history.push(`/club/${club.id}`);
  };
  const onAddBookmark = (e: any) => {
    if (!user?.id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(addBookmarkThunk(club.id));
  };
  const onRemoveBookmark = (e: any) => {
    if (!user?.id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(removeBookmarkThunk(club.id));
  };

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (club.isBookmark) {
      setIsBookmarked(true);
    }
    if (club.isBookmark === false) {
      setIsBookmarked(false);
    }
  }, [club]);

  useEffect(() => {
    if (isMain) {
      const isDBBookmark = club.Bookmarkers.find(
        (el: { id: number }) => el.id === user?.id,
      );
      if (isDBBookmark) {
        setIsBookmarked(true);
      }
    }
  }, []);

  return (
    <ClubCard
      club={club}
      onClickCard={onClickCard}
      onAddBookmark={isMain ? onAddBookmark : () => {}}
      onRemoveBookmark={isMain ? onRemoveBookmark : () => {}}
      isMain={isMain}
      isBookmarked={isMain ? isBookmarked : null}
    />
  );
});
