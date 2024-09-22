'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { CustomButton, SearchBox } from '@/components';

export function TravelerActivitySelection({
  onClick,
}: {
  onClick: () => void;
}) {
  const [, setSearchContent] = useState('');

  return (
    <styles.container>
      <styles.caption>나머지 일정도 추천해드릴게요.</styles.caption>
      <styles.description>어떤 활동을 하고 싶으세요?</styles.description>
      <SearchBox setContent={setSearchContent} />
      <styles.CustomButton
        color='#FF75C8'
        text='알아서 해줘'
        onClick={() => {
          onClick();
        }}
      />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    flex: 1 0 0;
    width: 100%;
    height: 100%;
    gap: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  caption: styled.p`
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 700;
    line-height: 28.96px;
    letter-spacing: -0.02em;
    align-self: flex-start;

    color: #505050;
  `,

  description: styled.p`
    font-family: Noto Sans KR;
    font-size: 23px;
    font-weight: 700;
    line-height: 33.3px;
    letter-spacing: -0.02em;

    color: #505050;

    margin-top: auto;
  `,

  CustomButton: styled(CustomButton)`
    margin-bottom: auto;
  `,
};
