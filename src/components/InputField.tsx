'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

interface Input {
  type: string;
  id: string;
  label: string;
}

export function InputField({ type, id, label }: Input) {
  const [value, setValue] = useState('');

  return (
    <styles.inputWrapper>
      <styles.inputField
        type={type}
        id={id}
        value={value}
        placeholder=' '
        onChange={(e) => setValue(e.target.value)}
      />
      <styles.inputLabel htmlFor={id}>{label}</styles.inputLabel>
    </styles.inputWrapper>
  );
}

const styles = {
  inputWrapper: styled.li`
    position: relative;
    margin-top: 1.25rem;
    width: 100%;
    border-bottom: 0.4px solid #d3d3d3;
  `,

  inputField: styled.input`
    width: 100%;
    padding: 1rem 0.3rem;
    color: #505050;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.01875rem;
    border: none;
    outline: none;
    background: transparent;

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -0.625rem;
      left: 0.3125rem;
      font-size: 0.75rem;
      color: #605eff;
    }
  `,

  inputLabel: styled.label`
    position: absolute;
    left: 0.625rem;
    top: 0.625rem;
    color: #b5b5b5;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.01875rem;
    transition: all 0.3s ease;
    pointer-events: none;
  `,
};
