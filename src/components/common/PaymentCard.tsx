import { MainPaymentResType } from 'api/main/payment';

export default function PaymentCard({
  title,
  price,
  ClubId,
  UserId,
  createdAt,
  status,
}: MainPaymentResType) {
  return (
    <div>
      <div>{title}</div>
      <div>{price}</div>
    </div>
  );
}
