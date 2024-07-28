'use client';

import styled from '@emotion/styled';

const styles = {
  container: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fafaff;
    z-index: -100;
  `,

  image: styled.img<Position>`
    position: absolute;
    object-fit: content;
    top: ${(props) => props.$top || 'auto'};
    bottom: ${(props) => props.$bottom || 'auto'};
    left: ${(props) => props.$left || 'auto'};
    right: ${(props) => props.$right || 'auto'};
  `,

  rec: styled.div<Color>`
    width: 6.0625rem;
    height: 6rem;
    transform: rotate(27.505deg);
    flex-shrink: 0;
    border-radius: 1.3125rem;
    border: ${(props) =>
      props.$page === 'login'
        ? '25px solid rgba(82, 80, 237, 0.06)'
        : '25px solid rgba(82, 80, 237, 0.13)'};

    filter: blur(2px);
    position: absolute;
    bottom: ${(props) => (props.$page === 'login' ? '12rem' : '18rem')};
    left: -3rem;
  `,
};

interface Position {
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

interface Color {
  $page: string;
}

export function Background({ page }: { page: string }) {
  return (
    <styles.container>
      <styles.image src={`./background/top-left-${page}.svg`} />
      <styles.image
        src={`./background/top-right-${page}.svg`}
        $top='10rem'
        $right='0'
      />
      <styles.image
        src={`./background/bottom-${page}.svg`}
        $bottom={page === 'login' ? '0' : '6rem'}
        $right='0'
      />
      <styles.rec $page={page} />
    </styles.container>
  );
}
