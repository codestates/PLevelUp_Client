import axios from 'axios';

export const loginAPI: (data: any) => Promise<LoginUser> = async data => {
  console.log('3.5: loginAPI요청');
  const response = await axios.post(
    'http://localhost:5000/api/main/auth/login',
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export type LoginUser = {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: null | string;
};
