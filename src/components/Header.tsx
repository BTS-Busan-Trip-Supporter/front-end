'use client';

import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';

interface Path {
  $pathname: string;
}

export function Header() {
  const pathName = usePathname();

  if (pathName === '/login' || pathName === '/my') {
    return null;
  }

  return <styles.hamburger $pathname={pathName} />;
}

const styles = {
  hamburger: styled.button<Path>`
    width: 1.25rem;
    height: 1.25rem;
    border: none;
    background: ${(props) =>
      props.$pathname === '/' ? `url('/bars.svg')` : `url('/bars-white.svg')`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: content;

    position: absolute;
    top: 2.25rem;
    right: 1.5rem;
    z-index: 9999;
  `,
};
