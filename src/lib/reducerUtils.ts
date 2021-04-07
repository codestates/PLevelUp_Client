import { AxiosError } from 'axios';

export type AsyncState<T, E = any> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
};

export const asyncState = {
  // 다음 코드는 화살표 함수에 Generic 을 설정 한 것입니다.
  initial: <T, E = any>(initialData?: T): AsyncState<T, AxiosError> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  load: <T, E = any>(data?: T): AsyncState<T, AxiosError> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E = any>(data: T): AsyncState<T, AxiosError> => ({
    loading: false,
    data,
    error: null,
  }),
  error: <T, E>(error: AxiosError): AsyncState<T, AxiosError> => ({
    loading: false,
    data: null,
    error: error,
  }),
};
