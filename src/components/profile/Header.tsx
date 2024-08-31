'use client';

import styled from '@emotion/styled';

export function Header({
  h2,
  prevButtonHandler,
}: {
  h2: string;
  prevButtonHandler: () => void;
}) {
  return (
    <styles.header>
      <styles.prevButton onClick={prevButtonHandler} />
      <h2>{h2}</h2>
    </styles.header>
  );
}

const styles = {
  header: styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.9rem;

    width: 100%;
    position: relative;

    h2 {
      color: #434343;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.02375rem;
    }
  `,

  prevButton: styled.button`
    background: url('/chevron-left.svg') no-repeat center;
    background-size: content;
    width: 1.125rem;
    height: 1.125rem;
    position: absolute;
    border: none;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  `,
};
