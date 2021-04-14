import React, { useState } from 'react';
import SlickClubList from '../../components/slick/SlickClubList';

export default function SlickClubListContainer() {
  const [curations, setCurations] = useState([
    {
      clubs: [
        {
          description: '스타트업에서 빠르게 성장하는 사람들의 비밀',
          coverUrl:
            'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
          dayOfSchedule: 6,
          // leaderTitle: '와디즈 CSO 황인범 님의' || null,
          maxMemberCount: 20,
          memberCount: 1,
          name: '스타트업 DNA',
          openedAt:
            '4/17' ||
            'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
          place: '온라인',
          price: 310000,
        },
        {
          description: '22스타트업에서 빠르게 성장하는 사람들의 비밀',
          coverUrl:
            'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
          dayOfSchedule: 6,
          leaderTitle: '와디즈 CSO 황인범 님의',
          maxMemberCount: 20,
          memberCount: 1,
          name: '스타트업 DNA',
          openedAt:
            '4/17' ||
            'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
          place: '온라인',
          price: 310000,
        },
        {
          description: '33스타트업에서 빠르게 성장하는 사람들의 비밀',
          coverUrl:
            'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
          dayOfSchedule: 6,
          leaderTitle: '와디즈 CSO 황인범 님의',
          maxMemberCount: 20,
          memberCount: 1,
          name: '스타트업 DNA',
          openedAt:
            '4/17' ||
            'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
          place: '온라인',
          price: 310000,
          weekOfSchedule: 3,
          wishedCount: 3,
        },
      ],
      name: '온라인에서 만나요',
    },
    {
      clubs: [
        {
          description: '스타트업에서 빠르게 성장하는 사람들의 비밀',
          coverUrl:
            'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
          dayOfSchedule: 6,
          leaderTitle: '와디즈 CSO 황인범 님의',
          maxMemberCount: 20,
          memberCount: 1,
          name: '스타트업 DNA',
          openedAt:
            '4/17' ||
            'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
          option: '온라인',
          place: '온라인(Zoom)',
          price: 310000,
          weekOfSchedule: 3,
          wishedCount: 3,
        },
        {
          description: '22스타트업에서 빠르게 성장하는 사람들의 비밀',
          coverUrl:
            'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
          dayOfSchedule: 6,
          leaderTitle: '와디즈 CSO 황인범 님의',
          maxMemberCount: 20,
          memberCount: 1,
          name: '스타트업 DNA',
          openedAt:
            '4/17' ||
            'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
          option: '온라인',
          place: '온라인(Zoom)',
          price: 310000,
          weekOfSchedule: 3,
          wishedCount: 3,
        },
        {
          description: '33스타트업에서 빠르게 성장하는 사람들의 비밀',
          coverUrl:
            'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
          dayOfSchedule: 6,
          leaderTitle: '와디즈 CSO 황인범 님의',
          maxMemberCount: 20,
          memberCount: 1,
          name: '스타트업 DNA',
          openedAt:
            '4/17' ||
            'Fri Mar 12 2021 02:00:00 GMT+0000 (Coordinated Universal Time)',
          option: '온라인',
          place: '온라인(Zoom)',
          price: 310000,
          weekOfSchedule: 3,
          wishedCount: 3,
        },
      ],
      name: '4명이서 만나요',
    },
  ]);
  return (
    <>
      {curations.map(curation => {
        return <SlickClubList data={curation.clubs} name={curation.name} />;
      })}
    </>
  );
}
