import React, { ChangeEvent, useState } from 'react';

export default function Search({
  onSearch,
  onPlace,
  onDay,
  onFilter,
  onLimitNumber,
}: {
  onSearch: (search: string) => void;
  onPlace: (place: string | null) => void;
  onDay: (day: string | null) => void;
  onFilter: (filter: string | null) => void;
  onLimitNumber: (onLimitNumber: string | null) => void;
}) {
  const [search, setSearch] = useState<string>('');
  const [isNew, setIsNew] = useState(false);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  };

  const onPlaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '장소') {
      onPlace(null);
      return;
    }
    onPlace(e.target.value);
  };

  const onDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '요일') {
      onDay(null);
      return;
    }
    onDay(e.target.value);
  };

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNew(!isNew);
    if (!isNew) {
      onFilter('isNew');
    } else {
      onFilter(null);
    }
  };

  const onLimitNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '인원수') {
      onLimitNumber(null);
      return;
    }
    onLimitNumber(e.target.value);
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
      <select onChange={onPlaceChange} style={{ marginLeft: '10px' }}>
        <option>장소</option>
        <option value="온라인">온라인</option>
        <option value="강남">강남</option>
        <option value="판교">판교</option>
        <option value="여의도">여의도</option>
        <option value="오프라인">오프라인</option>
      </select>
      <select onChange={onDayChange} style={{ marginLeft: '10px' }}>
        <option>요일</option>
        <option value="일">일</option>
        <option value="월">월</option>
        <option value="화">화</option>
        <option value="수">수</option>
        <option value="목">목</option>
        <option value="금">금</option>
        <option value="토">토</option>
      </select>
      <select onChange={onLimitNumberChange} style={{ marginLeft: '10px' }}>
        <option>인원수</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">이상</option>
      </select>
      <input type="checkbox" onChange={onFilterChange} checked={isNew} /> 새로운
      클럽
    </div>
  );
}
