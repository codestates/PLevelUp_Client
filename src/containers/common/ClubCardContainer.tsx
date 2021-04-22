import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  addBookmarkThunk,
  removeBookmarkThunk,
} from '../../modules/club/bookmark';
import { withRouter } from 'react-router-dom';
import ClubCard from '../../components/common/ClubCard';
import { MainClubReadResType } from '../../api/main/club';
import { RouteComponentProps } from 'react-router-dom';
import { MasterClubReadResType } from '../../api/master/club';

type ClubCardPropsType = {
  club: MainClubReadResType | MasterClubReadResType | any; //TODO any안쓰면 50줄 해결이 안됨..
  isMain: boolean;
};
export default withRouter(function ClubCardContainer({
  club,
  history,
  isMain,
}: ClubCardPropsType & RouteComponentProps) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ mainUser }: RootState) => ({
    user: mainUser.user?.data,
  }));
  const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMain) {
      history.push(`/club/${club.id}`);
    } else {
      history.push(`/master/${club.id}`);
    }
  };
  const onAddBookmark = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!user?.id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(addBookmarkThunk(club.id));
  };
  const onRemoveBookmark = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!user?.id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(removeBookmarkThunk(club.id));
  };

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Property 'isBookmark' does not exist on type 'MasterClubReadResType'.
    club?.isBookmark ? setIsBookmarked(true) : setIsBookmarked(false);
  }, [club]);

  return (
    <ClubCard
      club={club}
      onClickCard={onClickCard}
      onAddBookmark={onAddBookmark}
      onRemoveBookmark={onRemoveBookmark}
      isMain={isMain}
      isBookmarked={isMain ? isBookmarked : null}
    />
  );
});
