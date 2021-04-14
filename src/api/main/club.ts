import qs from 'qs';
import api from '../index';

type MainClubReadMasterType = {
  id: number;
  email: string;
  username: string;
};

export type MainClubReadResType = {
  id: number;
  title: string;
  summary: string;
  place: string;
  price: number;
  description: string;
  topic: string;
  startDate: Date;
  endDate: Date;
  day: string;
  limitUserNumber: number;
  createdAt: Date;
  updatedAt?: Date | null;
  MasterId: number;
  Master: MainClubReadMasterType;
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
