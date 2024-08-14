'use client';

import styled from '@emotion/styled';

export function TravelerHeaderText({ text }: { text: string }) {
  return (
    <styles.container>
      <h1>{text}</h1>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    position: relative;

    padding-bottom: 80px;

    h1 {
      font-family: Noto Sans KR;
      font-size: 27px;
      font-weight: 700;
      line-height: 39.1px;
      letter-spacing: -0.03em;
      text-align: center;

      color: #ffffff;
    }
  `,
};
