'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

export function SearchBox() {
  const [, setContent] = useState('');
  return (
    <styles.container>
      <input
        placeholder='키워드나 활동을 찾아보세요.'
        onChange={(e) => setContent(e.target.value)}
      />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    padding: 1rem 1.44rem;
    border-radius: 4rem;
    background: #fff;
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 90%;
      height: 100%;
      color: #505050;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.03rem;
      border: none;
      margin-left: 0.5rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #e2e2e2;
      }
    }

    &::before {
      content: '';
      display: inline-block;
      width: 0.15rem;
      height: 100%;
      background-color: #ededed;
    }

    &::after {
      content: '';
      display: inline-block;
      width: 1.625rem;
      height: 100%;
      background: url('/search-icon.svg') no-repeat center;
      background-size: 90%;
    }
  `,
};
