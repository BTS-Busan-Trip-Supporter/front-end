'use client';

import styled from '@emotion/styled';

export function RecentSearch({
  data,
  setData,
}: {
  data: { id: string; keyword: string }[];
  setData: (items: { id: string; keyword: string }[]) => void;
}) {
  const handleRemove = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem('recentSearch', JSON.stringify(updatedData));
  };

  return (
    <styles.wrapper>
      <styles.description>최근 검색</styles.description>
      <styles.list>
        {data.map((item: { id: string; keyword: string }) => (
          <Keyword
            key={item.id}
            id={item.id}
            keyword={item.keyword}
            onRemove={handleRemove}
          />
        ))}
      </styles.list>
    </styles.wrapper>
  );
}

function Keyword({
  id,
  keyword,
  onRemove,
}: {
  id: string;
  keyword: string;
  onRemove: (i: string) => void;
}) {
  return (
    <styles.keywordCon>
      <styles.keyword>{keyword}</styles.keyword>
      <styles.removeButton onClick={() => onRemove(id)} />
    </styles.keywordCon>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  description: styled.p`
    color: #505050;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.01875rem;
  `,

  list: styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  `,

  keywordCon: styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;

    border-radius: 50px;
    background: #eeedff;
    gap: 0.8rem;

    box-shadow: -2px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;
  `,

  keyword: styled.span`
    display: block;
    flex: 1;
    text-align: center;
    color: #505050;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.01875rem;
  `,

  removeButton: styled.div`
    width: 0.875rem;
    height: 0.875rem;
    background: url('/x.svg') no-repeat center;
    background-size: 100%;
  `,
};
