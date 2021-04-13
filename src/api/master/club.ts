import qs from 'qs';
import api from '../index';

export type MasterClubEditReqType = {
  [index: string]: string | number | Date | null;
  id: number | null;
  title: string;
  summary: string;
  price: number;
  place: string;
  description: string;
  topic: string;
  startDate: Date;
  endDate: Date;
  day: string;
  limitUserNumber: number;
};

export type MasterClubEditResType = {
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
};

export async function masterClubWrite({
  title,
  summary,
  price,
  place,
  description,
  topic,
  startDate,
  endDate,
  day,
  limitUserNumber,
}: MasterClubEditReqType) {
  const response = await api.post<MasterClubEditResType>(`/api/master/club`, {
    title,
    summary,
    price,
    place,
    description,
    topic,
    startDate,
    endDate,
    day,
    limitUserNumber,
  });
  return response.data;
}

type MasterClubReadMasterType = {
  id: number;
  email: string;
  username: string;
};

export type MasterClubReadResType = {
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
  Master: MasterClubReadMasterType;
};

export const masterClubRead = async (id: number) => {
  const response = await api.get<MasterClubReadResType>(
    `/api/master/club/${id}`,
  );
  return response.data;
};

export type MasterClubListResType = MasterClubReadResType[];

export type MasterClubListReqType = {
  [index: string]: string;
  page: string;
};

// list는 headers를 같이 쓰기 때문에 .data를 return 해주지 않고 response를 바로 return해준다.
export async function masterClubList({ page }: MasterClubListReqType) {
  const queryString = qs.stringify({ page });
  const response = await api.get<MasterClubListResType>(
    `/api/master/club?${queryString}`,
  );
  return response;
}
