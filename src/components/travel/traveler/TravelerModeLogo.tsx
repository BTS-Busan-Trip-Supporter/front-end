'use client';

import styled from '@emotion/styled';

export function TravelModeLogo() {
  return (
    <styles.container>
      <p>여행자 모드</p>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    width: fit-content;
    height: fit-content;
    border-radius: 2.8125rem;
    box-shadow: -2px 2px 4px 0px #00000026 inset;
    padding: 0.5rem 1.125rem;
    background: #7eff6a;

    transform: translateY(50%);

    p {
      font-family: Noto Sans KR;
      font-size: 16px;
      font-weight: 700;
      line-height: 23.17px;
      letter-spacing: -0.02em;
      text-align: left;

      color: #615de1;
    }
  `,
};
