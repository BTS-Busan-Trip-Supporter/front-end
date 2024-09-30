'use client';

import styled from '@emotion/styled';
import { usePathname, useRouter } from 'next/navigation';

interface NavProps {
  $active?: boolean;
}

export function NavigationBar() {
  const pathName = usePathname();
  const router = useRouter();

  if (
    pathName.startsWith('/login') ||
    pathName.startsWith('/my') ||
    pathName.startsWith('/sign-up')
  ) {
    return null;
  }

  return (
    <styles.wrapper>
      <styles.container>
        <button
          type='button'
          onClick={() => {
            router.replace('/my');
          }}
        >
          {pathName === '/my' ? (
            <styles.menu $active>
              <styles.icon src='/user-active.svg' alt='user-active-menu' />
              마이 페이지
            </styles.menu>
          ) : (
            <styles.menu>
              <styles.icon src='/user.svg' alt='user-menu' />
              마이 페이지
            </styles.menu>
          )}
        </button>
        <button
          type='button'
          onClick={() => {
            router.replace('/');
          }}
        >
          {pathName === '/' || pathName.startsWith('/travel') ? (
            <styles.menu $active>
              <styles.icon src='/travel-active.png' alt='travel-active-menu' />
              놀러가기
            </styles.menu>
          ) : (
            <styles.menu>
              <styles.icon src='/travel.png' alt='travel-menu' />
              놀러가기
            </styles.menu>
          )}
        </button>
        <button
          type='button'
          onClick={() => {
            router.replace('/record');
          }}
        >
          {pathName.startsWith('/record') ? (
            <styles.menu $active>
              <styles.icon src='/record-active.png' alt='record-active-menu' />
              기록하기
            </styles.menu>
          ) : (
            <styles.menu>
              <styles.icon src='/record.png' alt='record-menu' />
              기록하기
            </styles.menu>
          )}
        </button>
      </styles.container>
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.nav`
    display: flex;
    position: relative;
    z-index: 99999;
  `,

  container: styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
    background-color: white;

    button {
      all: unset;
    }
  `,

  menu: styled.span<NavProps>`
    color: ${(props) => (props.$active ? '#605EFF' : '#b0afbc')};

    font-family: 'Noto Sans KR';
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.2rem;
    transition: 0.3s ease;
  `,

  icon: styled.img`
    width: 1.3rem;
  `,
};
