'use client';

import styled from '@emotion/styled';

import { CustomButton, SearchBox } from '@/components';

export function TravelerMain({ onNextPage }: { onNextPage: () => void }) {
  const user = {
    name: '최보윤',
  };

  return (
    <styles.container>
      <h2>
        {user.name}님,
        <br />
        어디가실 계획인가요?
      </h2>
      <SearchBox setContent={() => {}} />
      <CustomButton
        color='#FF75C8'
        text='내 주변에서 알아서 해줘'
        onClick={onNextPage}
        grow
      />
    </styles.container>
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

    h2 {
      color: #505050;
      font-family: 'Noto Sans KR';
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
      text-align: center;
    }
  `,
};
