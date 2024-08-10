'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { ContentsCard } from '@/components/travel/ContentsCard';
import { PuppleBackground } from '@/components/travel/PuppleBackground';

interface TravelComponentProps {
  backgroundNode: ReactNode;
  childNode: ReactNode;
  type: 'auto' | 'traveler' | 'edit';
}

export function TravelComponent({
  contents,
}: {
  contents: TravelComponentProps;
}) {
  return (
    <styles.container>
      <PuppleBackground child={contents.backgroundNode} />
      <ContentsCard child={contents.childNode} type={contents.type} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  `,
};
