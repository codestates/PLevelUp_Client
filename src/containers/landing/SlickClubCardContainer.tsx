import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainListThunk } from '../../modules/club/list';
import SlickClubCard from '../../components/landing/SlickClubCard';
import { MainClubListResType } from 'api/main/club';

export default function SlickClubCardContainer() {
  const dispatch = useDispatch();
  const { clubs, error, loading } = useSelector(
    ({ mainListAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data,
      error: mainListAsync.clubs.error,
      loading: mainListAsync.clubs.loading,
    }),
  );
  const [curations, setCurations] = useState<any>([
    {
      clubs: [],
      name: '온라인에서 만나요',
    },
    {
      clubs: [],
      name: '4명이서 만나요',
    },
  ]);
  useEffect(() => {
    dispatch(mainListThunk({ page: 1 }));
    setCurations(
      curations.map(
        (curation: { clubs: MainClubListResType | null; name: string }) => {
          return {
            ...curation,
            clubs: clubs || [],
          };
        },
      ),
    );
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
        curations?.map(
          (curation: { clubs: MainClubListResType | null; name: string }) => {
            return <SlickClubCard data={curation.clubs} name={curation.name} />;
          },
        )
      )}
    </>
  );
}
