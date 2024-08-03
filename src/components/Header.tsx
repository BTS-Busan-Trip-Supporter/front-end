'use client';

import styled from '@emotion/styled';

const styles = {
  hamburger: styled.button`
    width: 1.25rem;
    height: 1.25rem;
    border: none;
    background: url('./bars.svg') no-repeat center;
    background-size: content;

    position: absolute;
    top: 2.25rem;
    right: 1.5rem;
  `,
};

export function Header() {
  return <styles.hamburger />;
}
