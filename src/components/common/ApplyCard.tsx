import { MainApplyResType } from 'api/main/myPage';

export default function ApplyCard({
  title,
  place,
  summary,
  times,
}: MainApplyResType) {
  return (
    <div>
      <div>{title}</div>
      <div>{summary}</div>
      <div>{place}</div>
      <div>{times}</div>
    </div>
  );
}
