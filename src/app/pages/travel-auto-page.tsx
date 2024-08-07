'use client';

import { TravelComponent } from '@/components';
import { ChoiceList } from '@/components/travel';

export function TravelAutoPage() {
  const data = {
    where: '부산 (Busan)',
    what: '웰니스 관광',
    when: '늦은 오후',
  };

  const Contents = {
    backgroundNode: <ChoiceList choiceList={data} />,
    childNode: <></>,
    type: 'auto',
  };
  return <TravelComponent contents={Contents} />;
}
