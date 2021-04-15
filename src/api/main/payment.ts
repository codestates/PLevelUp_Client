import { callbackify } from 'node:util';
import { InterfaceTypeWithDeclaredMembers } from 'typescript';
import api from '../index';

export interface IamportWindow extends Window {
  IMP: IMP;
}

export interface IMP {
  init: (imp_uid: string) => void;
  //callback에서 결제가 성공(rsp.success: true) 하면 rsp의 imp_uid와 merchant_uid를 서버에 전달
  request_pay: (
    params: IamportPaymentReqType,
    callback: (res: IamportPaymentResType) => void,
  ) => void;
}

export const mainIamPort = (imp_uid: 'imp67413694') => {};

export const mainRequestPay = (params: IamportPaymentReqType) => {
  return function (res: IamportPaymentResType) {};
};

export type IamportPaymentReqType = {
  pg?: string; //pg: "html5_inicis",
  pay_method: 'card' | 'vbank' | any; // 'card' | 'trans'(실시간계좌이체) | 'vbank' (가상계좌)
  merchant_uid: string | any; //고유주문번호, 필수항목, 같은 주문번호로 재결제 불가
  name: string | any; //결제정보 확인, clubName 넣으면 될듯
  amount: number | any; //결제금액
  buyer_email: string | any;
  buyer_name: string | any;
  notice_url?: string;
  card_quota?: number[];
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
      receipt_url: string; //매출전표 url
    }
  | {
      success: false;
      imp_uid?: string;
      error_code: string;
      error_msg: string;
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
};

export const mainPayment = async (data: IamportPaymentResType) => {
  const response = await api.post<MainClubReadResType>(`/api/main/payment/pay`);
  return response.data;
};
