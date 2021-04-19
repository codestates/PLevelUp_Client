import React, { useCallback } from 'react';
import { useState } from 'react';
import Categories from './Categories';
import FaqList from './FaqList';

export default function HelpContainer() {
  const [category, setCategory] = useState('Club');
  const onSelect = useCallback(category => setCategory(category), []);

  return (
    <>
      <Categories category={category} onSelect={onSelect} />
      <FaqList category={category} />
    </>
  );
}
