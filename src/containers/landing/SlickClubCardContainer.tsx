import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainListThunk } from '../../modules/club/list';
import SlickClubCard from '../../components/landing/SlickClubCard';
import { MainClubListResType, MainClubReadResType } from 'api/main/club';
import { mainClubBookmarkUnload } from '../../modules/club/bookmark';
export default function SlickClubCardContainer() {
  const dispatch = useDispatch();
  const { clubs, error, loading, bookmark } = useSelector(
    ({ mainListAsync, mainBookmarkAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data,
      error: mainListAsync.clubs.error,
      loading: mainListAsync.clubs.loading,
      bookmark: mainBookmarkAsync.bookmark.data,
    }),
  );

  type curationsType = {
    clubs: MainClubListResType;
    name: string;
  };
  const [curations, setCurations] = useState<curationsType[]>([
    {
      clubs: [],
      name: '온라인에서 만나요',
    },
    {
      clubs: [],
      name: '4명이서 만나요',
    },
  ]);

  const newStateClub = curations?.map((curation: curationsType) => ({
    ...curation,
    clubs: curation.clubs?.map((club: MainClubReadResType) =>
      club.id === bookmark?.clubId
        ? {
            ...club,
            isBookmark: !club.isBookmark,
          }
        : club,
    ),
  }));
  useEffect(() => {
    setCurations(newStateClub);
    dispatch(mainClubBookmarkUnload());
  }, [bookmark]);

  useEffect(() => {
    dispatch(mainListThunk({ page: 1 }));
  }, [dispatch]);
  useEffect(() => {
    setCurations(
      curations?.map((curation: curationsType) => {
        return {
          ...curation,
          clubs: clubs || [],
        };
      }),
    );
  }, [loading]);

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
        curations?.map((curation: curationsType) => {
          return (
            <SlickClubCard
              data={curation.clubs}
              name={curation.name}
              key={curation.name}
            />
          );
        })
      )}
    </>
  );
}
