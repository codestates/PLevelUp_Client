import qs from 'qs';
import api from '../index';

export type MasterClubEditReqType = {
  [index: string]: string | number | Date | null | File;
  id: number | null;
  title: string;
  summary: string;
  price: number;
  place: string;
  description: string;
  startDate: Date;
  times: number;
  limitUserNumber: number;
  coverImg: File | null;
  coverUrl: string | null;
};

export type MasterClubEditResType = {
  id: number;
  title: string;
  summary: string;
  place: string;
  price: number;
  description: string;
  startDate: Date;
  times: number;
  day: string;
  limitUserNumber: number;
  createdAt: Date;
  updatedAt?: Date | null;
  MasterId: number;
  coverImg?: File | null;
  coverUrl: string | null;
};

export async function masterClubWrite({
  title,
  summary,
  price,
  place,
  description,
  startDate,
  times,
  limitUserNumber,
  coverImg,
}: MasterClubEditReqType) {
  const form = new FormData();
  form.append('img', coverImg!!);
  const imgResponse = await api.post<{ url: string }>(`/api/master/img`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const coverUrl = imgResponse.data.url;

  const response = await api.post<MasterClubEditResType>(`/api/master/club`, {
    title,
    summary,
    price,
    place,
    description,
    startDate,
    times,
    limitUserNumber,
    coverUrl,
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
  startDate: Date;
  times: number;
  day: string;
  limitUserNumber: number;
  createdAt: Date;
  updatedAt?: Date | null;
  MasterId: number;
  Master: MasterClubReadMasterType;
  coverUrl: string;
};

export const masterClubRead = async (id: number) => {
  const response = await api.get<MasterClubReadResType>(
    `/api/master/club/${id}`,
  );
  return response.data;
};

export type MasterClubListResType = MasterClubReadResType[];

export type MasterClubListReqType = {
  [index: string]: number;
  page: number;
};

// list는 headers를 같이 쓰기 때문에 .data를 return 해주지 않고 response를 바로 return해준다.
export async function masterClubList({ page }: MasterClubListReqType) {
  const queryString = qs.stringify({ page });
  const response = await api.get<MasterClubListResType>(
    `/api/master/club?${queryString}`,
  );
  return response;
}

export const masterClubUpdate = async ({
  id,
  title,
  summary,
  price,
  place,
  description,
  startDate,
  times,
  limitUserNumber,
  coverImg,
  coverUrl,
}: MasterClubEditReqType) => {
  let updateCoverUrl = coverUrl;
  if (coverImg) {
    const form = new FormData();
    form.append('img', coverImg!!);
    const imgResponse = await api.post<{ url: string }>(
      `/api/master/img`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    updateCoverUrl = imgResponse.data.url;
  }

  const response = await api.patch<MasterClubEditResType>(
    `/api/master/club/${id}`,
    {
      title,
      summary,
      price,
      place,
      description,
      startDate,
      times,
      limitUserNumber,
      coverUrl: updateCoverUrl,
    },
  );
  return response.data;
};

export const masterClubRemove = (id: number) =>
  api.delete(`/api/master/club/${id}`);
