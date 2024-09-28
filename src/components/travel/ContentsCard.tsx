'use client';

import styled from '@emotion/styled';
import type { ReactNode } from 'react';

export function ContentsCard({
  child,
  type,
}: {
  child: ReactNode;
  type: 'auto' | 'traveler' | 'edit';
}) {
  return <styles.container $type={type}>{child}</styles.container>;
}

const styles = {
  container: styled.div<{ $type: 'auto' | 'traveler' | 'edit' }>`
    width: 100%;
    height: 76%;
    border-radius: 2.6875rem;
    background: #fafaff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    top: 24%;
  `,
};
