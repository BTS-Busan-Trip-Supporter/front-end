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
            여행하기
          </styles.menu>
        ) : (
          <styles.menu>
            <styles.icon src='/travel.png' alt='travel-menu' />
            여행하기
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
  );
}

const styles = {
  container: styled.nav`
    width: 100%;
    max-width: 375px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.75rem 0;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 99999;

    button {
      all: unset;
    }
  `,

  menu: styled.span<NavProps>`
    color: ${(props) => (props.$active ? '#605EFF' : '#b0afbc')};

    font-family: 'Noto Sans KR';
    font-size: 0.5rem;
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
    width: 1.125rem;
  `,
};
