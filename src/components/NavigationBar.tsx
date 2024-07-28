'use client';

import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';

const styles = {
  container: styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.5rem 0;
    position: fixed;
    bottom: 0;
    background-color: white;
  `,

  menu: styled.span<NavProps>`
    color: ${(props) => (props.$active ? '#605EFF' : '#b0afbc')};

    font-family: 'Noto Sans KR';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.2rem;
  `,

  icon: styled.img`
    width: 1.75rem;
    object-fit: content;
  `,
};

interface NavProps {
  $active?: boolean;
}

export function NavigationBar() {
  const pathName = usePathname();

  if (pathName === '/login' || pathName === '/my') {
    return null;
  }

  return (
    <styles.container>
      {pathName === '/travel' ? (
        <styles.menu $active>
          <styles.icon src='./travel-active.png' alt='travel-active-menu' />
          여행하기
        </styles.menu>
      ) : (
        <styles.menu>
          <styles.icon src='./travel.png' alt='travel-menu' />
          여행하기
        </styles.menu>
      )}
      {pathName === '/' ? (
        <styles.menu $active>
          <styles.icon src='./home-active.png' alt='home-active-menu' />홈
        </styles.menu>
      ) : (
        <styles.menu>
          <styles.icon src='./home.png' alt='home-menu' />홈
        </styles.menu>
      )}
      {pathName === '/write' ? (
        <styles.menu $active>
          <styles.icon src='./write-active.png' alt='write-active-menu' />
          기록하기
        </styles.menu>
      ) : (
        <styles.menu>
          <styles.icon src='./write.png' alt='write-menu' />
          기록하기
        </styles.menu>
      )}
    </styles.container>
  );
}
