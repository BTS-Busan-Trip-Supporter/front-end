'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Position {
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

export function PurpleBackground({ child }: { child: ReactNode }) {
  return (
    <styles.container>
      <Elements />
      <styles.choiceSection>{child}</styles.choiceSection>
    </styles.container>
  );
}

function Elements() {
  return (
    <>
      <styles.image
        src='/background/pupple/ellipse1.svg'
        $top='0'
        $left='0'
        alt='ellipse1'
      />
      <styles.image
        src='/background/pupple/ellipse2.svg'
        $bottom='4rem'
        $right='5rem'
        alt='ellipse2'
      />
      <styles.image
        src='/background/pupple/polygon1.svg'
        $bottom='4rem'
        $left='3rem'
        alt='polygon1'
      />
      <styles.image
        src='/background/pupple/polygon2.svg'
        $top='1rem'
        $right='0'
        alt='polygon2'
      />
      <styles.image
        src='/background/pupple/vector.svg'
        $top='0'
        $right='0'
        alt='vector'
      />
      <styles.rec />
    </>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    height: 17rem;
    position: relative;
    background: linear-gradient(180deg, #6b67f9 0.04%, #3f3d93 90.12%);
    padding: 1.25rem;
    display: flex;
    z-index: -10000;
  `,

  image: styled.img<Position>`
    position: absolute;
    object-fit: content;
    top: ${(props) => props.$top || 'auto'};
    bottom: ${(props) => props.$bottom || 'auto'};
    left: ${(props) => props.$left || 'auto'};
    right: ${(props) => props.$right || 'auto'};
    z-index: -2000;
  `,

  rec: styled.div`
    width: 4.6385rem;
    height: 3.64544rem;
    transform: rotate(29.395deg);
    flex-shrink: 0;

    border-radius: 0.4375rem;
    border: 14px solid #5d5ad8;

    position: absolute;
    bottom: 50%;
    left: 9rem;
    z-index: -2000;
  `,

  choiceSection: styled.div`
    display: flex;
    width: 100%;
  `,
};
