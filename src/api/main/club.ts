import qs from 'qs';
import api from '../index';

type MainClubReadMasterType = {
  id: number;
  email: string;
  username: string;
};

export type MainClubReadResType = {
  id: number; //* 클럽 id
  title: string; //* '스타트업DNA'
  summary: string; //* '스타트업에서 빠르게 성장하는 사람들의 비밀'
  place: string; //* '온라인' || 홍대 || '강남'
  price: number; //* 50000
  description: string; //* 각종 내용
  topic: string; //*
  startDate: Date; //* '2021-04-07 14:20:09.168',
  endDate: Date; //* '2021-04-07 14:20:09.168',
  day: string; //* 월 / 화 / 수
  limitUserNumber: number; //* 20
  createdAt: Date; //* '2021-04-07 14:20:09.168',
  updatedAt?: Date | null; //* '2021-04-07 14:20:09.168',
  MasterId: number; //* 클럽장 아이디
  Master: MainClubReadMasterType;
  coverUrl: string; //*'https://image.trevari.co.kr/file/af0767ba-bd4a-4d11-8b67-7980faede3e2.%E1%84%92%E1%85%AA%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B7.png',
};

export const mainClubRead = async (id: number) => {
  const response = await api.get<MainClubReadResType>(`/api/main/club/${id}`);
  return response.data;
};

export type MainClubListResType = MainClubReadResType[];

export type MainClubListReqType = {
  [index: string]: number;
  page: number;
};

// list는 headers를 같이 쓰기 때문에 .data를 return 해주지 않고 response를 바로 return해준다.
export async function mainClubList({ page }: MainClubListReqType) {
  const queryString = qs.stringify({ page });
  const response = await api.get<MainClubListResType>(
    `/api/main/club?${queryString}`,
  );
  return response;
}

// export async function placeClubList({ place }: MainClubListResType) {
//   const queryString = qs.stringify({ place });
//   const response = await api.get<MainClubListResType>(
//     `club/list?placeFilter=${queryString}`);
//   return response;
// }

// 밑처럼 시도하려고 함
// const mainClubList = async ({ page }: MainClubListReqType) => {
//   const queryString = qs.stringify({ page });
//   const response = await api.get<MainClubListResType>(
//     `/api/main/club?${queryString}`,
//   );
//   return response;
// }

// const placeClubList = async ({ place }: MainClubListReqType) => {
//   const queryString = qs.stringify({ place });
//   const response = await api.get<MainClubListResType>(
//     `club/list?placeFilter=${queryString}`);
//   return response;
// }

// export default { mainClubList, placeClubList };
