import qs from 'qs';
import { Link } from 'react-router-dom';

type buildLinkType = {
  page: number;
};

const buildLink = ({ page }: buildLinkType) => {
  const query = qs.stringify({ page });
  return `/master/?${query}`;
};

type PaginationType = {
  page: number;
  lastPage: number;
};

export default function Pagination({ page, lastPage }: PaginationType) {
  return (
    <div
      style={{
        width: '320px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '3rem',
      }}
    >
      {page === 1 ? (
        <button disabled>이전</button>
      ) : (
        <Link to={buildLink({ page: page - 1 })}>
          <button>이전</button>
        </Link>
      )}
      <div>{page}</div>
      {page === lastPage ? (
        <button disabled>다음</button>
      ) : (
        <Link to={buildLink({ page: page + 1 })}>
          <button>다음</button>
        </Link>
      )}
    </div>
  );
}
