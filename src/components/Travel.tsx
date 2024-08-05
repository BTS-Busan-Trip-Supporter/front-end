'use client';

import { ReactNode } from 'react';

import { ContentsCard } from '@/components/travel/ContentsCard';
import { PuppleBackground } from '@/components/travel/PuppleBackground';

interface TravelComponentProps {
  choiceList: {
    where?: string;
    what?: string;
    when?: string;
  };
  childNode: ReactNode;
}

export function Travel({ contents }: { contents: TravelComponentProps }) {
  return (
    <>
      <PuppleBackground choiceList={contents.choiceList} />
      <ContentsCard child={contents.childNode} />
    </>
  );
}
