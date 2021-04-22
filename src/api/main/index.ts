import api from '../index';
import { MainClubListResType } from './club';

export type MainLandingResType = {
  onlineList: MainClubListResType;
  newList: MainClubListResType;
  gangnamList: MainClubListResType;
  fourLimitList: MainClubListResType;
};

export const mainLandingList = async () => {
  const response = await api.get<MainLandingResType>(`/api/main/landinglist`);
  return response.data;
};
