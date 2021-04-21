import { MainPaymentResType } from 'api/main/payment';

export default function PaymentCard({
  title,
  price,
  createdAt,
}: MainPaymentResType) {
  return (
    <div>
      <div>{title}</div>
      <div>{price}</div>
      <div>{createdAt}</div>
    </div>
  );
}
