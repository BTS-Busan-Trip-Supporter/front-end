'use client';

import styled from '@emotion/styled';

export function Loading() {
  return (
    <styles.wrapper>
      <div>
        <p>
          흥미로운 여행지를
          <br />
          선택해보세요!
        </p>
        <span>잠시만 기다려 주세요</span>
      </div>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    width: 100%;
    min-height: 100dvh;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    padding: 0.5rem 0.5rem 20rem 0.5rem;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    p {
      color: #505050;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
    }

    span {
      color: #e2e2e2;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02875rem;
    }
  `,
};
