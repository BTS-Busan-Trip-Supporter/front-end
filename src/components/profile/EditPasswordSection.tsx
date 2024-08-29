'use client';

import styled from '@emotion/styled';

export function EditPasswordSection({
  currentPWD,
  onClick,
}: {
  currentPWD: string;
  onClick: () => void;
}) {
  return (
    <styles.container>
      <ul>
        <li>
          현재 비밀번호 <span>{currentPWD}</span>
        </li>
        <li>
          변경할 비밀번호 <styles.inputPWD type='password' />
        </li>
      </ul>
      <styles.submitButton onClick={onClick}>확인</styles.submitButton>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 1.25rem;
    gap: 1.5rem;

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    li {
      border-bottom: 0.4px solid #d3d3d3;
      width: 100%;
      padding: 1rem 0.3rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;

      color: #505050;
      font-family: 'Noto Sans KR';
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.01875rem;
    }

    span {
      color: #b5b5b5;

      text-align: right;
      font-family: 'Noto Sans KR';
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.01875rem;
    }
  `,

  submitButton: styled.button`
    background: #605eff;
    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.02rem;
    padding: 1rem;
    width: 100%;
    border-radius: 7px;
    border: none;
  `,

  inputPWD: styled.input`
    flex: 1;
    height: 100%;
    border: none;

    color: #b5b5b5;

    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.3px;

    &:focus {
      outline: none;
    }
  `,
};
