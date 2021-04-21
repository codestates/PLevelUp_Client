import { MainApplyResType } from 'api/main/myPage';

export default function ApplyCard({ title, price, summary }: MainApplyResType) {
  return (
    <div>
      <div>{title}</div>
      <div>{summary}</div>
      <div>{price}</div>
    </div>
  );
}
