import api from '../index';

export type MasterClubEditReqType = {
  [index: string]: string | number | Date;
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
export const masterClubRead = (id: number) =>
  api.get<MasterClubReadResType>(`/api/master/club/${id}`);
