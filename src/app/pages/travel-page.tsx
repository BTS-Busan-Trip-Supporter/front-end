'use client';

import styled from '@emotion/styled';

import { Background, SearchBox } from '@/components';

export function TravelPage() {
  return (
    <>
      <Background page='travel' />
      <styles.container>
        <SearchBox />
      </styles.container>
    </>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.37rem;
    justify-content: center;
    align-items: center;
    gap: 1.69rem;
  `,
};
