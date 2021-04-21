import api from '../index';

export interface IMP {
  init: (imp_uid: string) => void;
  request_pay: (
    params: IamportPaymentReqType,
    callback: (res: IamportPaymentResType) => void,
  ) => void;
}

declare global {
  interface Window {
    IMP?: IMP;
  }
}

export type IamportPaymentReqType = {
  pg?: string;
  pay_method: 'card' | 'vbank' | any;
  merchant_uid: string | any;
  name: string | any;
  amount: number | any;
  buyer_email: string | any;
  buyer_name: string | any;
  notice_url?: string;
  custom_data: number;
  card_quota?: number[];
  m_redirect_url: string;
};

export type IamportPaymentResType =
  | {
      success: true;
      imp_uid: string;
      merchant_uid: string;
      pay_method: string;
      status: string;
      name: string;
      card_name?: string;
      card_quota: number[];
      vbank_num?: string;
      vbank_name?: string;
      vbank_date?: number;
      buyer_name: string;
      buyer_email: string;
      paid_amount: number;
      paid_at: string;
      m_redirect_url: string;
    }
  | {
      success: false;
      imp_uid?: string;
      error_code: string;
      error_msg: string;
    };

export type MainPaymentResType = {
  id?: number;
  status?: string;
  title: string;
  price: number;
  UserId?: number;
  ClubId?: number;
  merchantUid?: string;
  createdAt: Date;
};

export type MainPaymentHistoryResType = MainPaymentResType[];

export async function mainPaymentHistory() {
  const response = await api.get<MainPaymentHistoryResType>(
    `/api/main/payment/history`,
  );
  return response.data;
}
