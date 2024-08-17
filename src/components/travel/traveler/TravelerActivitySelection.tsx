'use client';

import styled from '@emotion/styled';

export function TravelerActivitySelection({
  onClick,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <styles.container onClick={onClick}>Activity Selection</styles.container>
  );
}

const styles = {
  container: styled.div`
    flex: 1 0 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  `,
};
