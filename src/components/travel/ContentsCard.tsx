'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

export function ContentsCard({ child }: { child: ReactNode }) {
  return <styles.container>{child}</styles.container>;
}

const styles = {
  container: styled.div`
    width: 100%;
    min-height: 75%;
    border-radius: 2.6875rem;
    background: #fafaff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    bottom: 0;

    display: flex;
    padding: 1.25rem;
    align-items: center;
    justify-content: center;
  `,
};
