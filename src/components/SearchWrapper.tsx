'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { RecentSearch } from './RecentSearch';
import { SearchBox } from './SearchBox';

export function SearchWrapper({
  setContent,
}: {
  setContent: (value: string) => void;
}) {
  const [data, setData] = useState<{ id: string; keyword: string }[]>(
    JSON.parse(localStorage.getItem('recentSearch') ?? '[]'),
  );

  const handleAddSearch = (value: string) => {
    const recentSearch = JSON.parse(
      localStorage.getItem('recentSearch') || '[]',
    );

    const newSearch = {
      id: Date.now(),
      keyword: value,
    };

    const updatedSearch = [...recentSearch, newSearch];

    localStorage.setItem('recentSearch', JSON.stringify(updatedSearch));
    setData(updatedSearch);
  };

  return (
    <styles.wrapper>
      <SearchBox setContent={setContent} handleAddSearch={handleAddSearch} />
      {data.length > 0 && <RecentSearch data={data} setData={setData} />}
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    align-items: center;
  `,
};
