'use client';

import styled from '@emotion/styled';

import { Background } from '@/components';

interface ButtonProps {
  $type?: string;
}

export function LoginPage() {
  return (
    <>
      <Background page='login' />
      <styles.container>
        <h2>
          P의 여행과 함께
          <br /> 지금 여행을 시작하세요!
        </h2>
        <styles.socialSection>
          <styles.bubble>간편 로그인 시작하기</styles.bubble>
          <styles.kakaoLoginBtn />
        </styles.socialSection>
        <styles.customBtn $type='login'>
          <span>이메일로 로그인</span>
        </styles.customBtn>
        <styles.customBtn $type='sign'>
          <span>회원가입</span>
        </styles.customBtn>
        <styles.loginMenuContainer>
          <li>아이디 찾기</li>
          <li>비밀번호 찾기</li>
          <li>문의하기</li>
        </styles.loginMenuContainer>
      </styles.container>
    </>
  );
}

const styles = {
  container: styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 3.56rem;
    justify-content: center;
    align-items: center;

    h2 {
      color: #505050;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1.3125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.02625rem;
    }
  `,
  socialSection: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 3rem 0 2.63rem 0;
  `,
  bubble: styled.div`
    color: #262626;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 0.85625rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: -0.01713rem;
    z-index: 100;

    width: 10.1875rem;
    height: 2.8125rem;
    background: url('/start-social-login.svg') no-repeat center;
    background-size: 100%;
  `,
  kakaoLoginBtn: styled.button`
    width: 3.25rem;
    height: 3.25rem;
    background: url('/kakao.svg') no-repeat center;
    background-size: 100%;
    border: none;
  `,
  customBtn: styled.button<ButtonProps>`
    width: 100%;
    height: 2.625rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    background: ${(props) => (props.$type === 'login' ? '#605EFf' : '#fff')};
    border: ${(props) =>
      props.$type === 'login' ? 'none' : '0.7px solid #B8B8B8'};
    margin-bottom: 0.44rem;

    span {
      color: ${(props) => (props.$type === 'login' ? '#fff' : '#6B6B6B')};
      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.02rem;

      ${({ $type }) =>
        $type === 'login' &&
        `
      &::before {
        content: '';
        display: inline-block;
        width: 1.12906rem; 
        height: 1.16669rem; 
        background: url('/mail.png') no-repeat center; 
        margin-right: 0.5rem; 
        background-size: 100%;
        transform: translateY(0.2rem);
      }
    `}
    }
  `,
  loginMenuContainer: styled.ul`
    display: flex;
    list-style: none;
    margin-top: 0.94rem;
    justify-content: center;

    li {
      color: #949494;

      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.0175rem;
      padding: 0 0.6rem;
      position: relative;

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 0.875rem;
        top: 50%;
        right: 0;
        transform: translateY(-40%);
        background-color: #949494;
      }
    }
  `,
};
