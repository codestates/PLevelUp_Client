import React, { ChangeEvent, useState } from 'react';

export default function Search({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  const [search, setSearch] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(search);
    } else {
      console.log('여기');
    }
  };

  return (
    <div>
      <input value={search} onChange={onChange} onKeyPress={handleKeyPress} />
      <button
        onClick={() => {
          onSearch(search);
        }}
        value={'버튼'}
      >
        검색
      </button>
    </div>
  );
}
