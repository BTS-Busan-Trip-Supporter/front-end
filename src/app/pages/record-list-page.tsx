'use client';

import { TravelComponent, TravelList } from '@/components';
import { TravelerHeaderText } from '@/components/travel/traveler';

export function RecordList() {
  const Contents = {
    backgroundNode: <TravelerHeaderText text='여행은 어땠나요?' />,
    childNode: <TravelList />,
    type: 'edit' as const,
  };
  return <TravelComponent contents={Contents} />;
}
