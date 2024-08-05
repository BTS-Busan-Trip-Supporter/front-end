'use client';

import { TravelComponent } from '@/components';

const Contents = {
  choiceList: {
    where: '부산 (Busan)',
    what: '웰니스 관광',
    when: '늦은 오후',
  },
  childNode: <></>,
};

export function TravelAutoPage() {
  return <TravelComponent contents={Contents} />;
}
