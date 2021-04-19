import React, { ChangeEvent, useState } from 'react';

export default function Search({
  onSearch,
  onPlace,
}: {
  onSearch: (search: string) => void;
  onPlace: (place: string | null) => void;
}) {
  const [search, setSearch] = useState<string>('');

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  };

  const onPlaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '전체보기') {
      onPlace(null);
      return;
    }
    onPlace(e.target.value);
  };
  return (
    <div>
      <input
        value={search}
        onChange={onSearchChange}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={() => {
          onSearch(search);
        }}
        value={'버튼'}
      >
        검색
      </button>
      <select onChange={onPlaceChange}>
        <option>전체보기</option>
        <option value="온라인">온라인</option>
        <option value="강남">강남</option>
        <option value="판교">판교</option>
        <option value="여의도">여의도</option>
      </select>
    </div>
  );
}
