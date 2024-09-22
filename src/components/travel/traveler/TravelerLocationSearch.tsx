'use client';

import styled from '@emotion/styled';

import { SearchBox } from '@/components';

export function TravelerLocationSearch({
  onClick,
  onContentChange,
}: {
  onClick: () => void;
  onContentChange: (value: string) => void;
}) {
  return (
    <styles.container>
      <h2>미리 계획한 장소를 입력하세요.</h2>
      <SearchBox setContent={onContentChange} onClick={onClick} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h1 {
      font-family: Noto Sans KR;
      font-size: 23px;
      font-weight: 700;
      line-height: 33.3px;
      letter-spacing: -0.02em;
      text-align: center;

      color: #505050;
    }
  `,
};
