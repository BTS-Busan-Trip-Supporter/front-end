'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

export function ContentsCard({
  child,
  type,
}: {
  child: ReactNode;
  type: string;
}) {
  return <styles.container $type={type}>{child}</styles.container>;
}

const styles = {
  container: styled.div<{ $type: string }>`
    width: 100%;
    min-height: 100%;
    border-radius: 2.6875rem;
    background: #fafaff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    overflow-y: auto;

    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    top: ${({ $type }) => {
      switch ($type) {
        case 'auto':
          return '12rem';
        case 'traveler':
          return '7rem';
        case 'edit':
          return '9rem';
        default:
          return '12rem';
      }
    }};

    padding-bottom: ${({ $type }) => {
      switch ($type) {
        case 'auto':
          return '13rem';
        case 'traveler':
          return '8rem';
        case 'edit':
          return '10rem';
        default:
          return '13rem';
      }
    }};
  `,
};
