'use client';

import { TravelComponent, TravelLog } from '@/components';
import { TravelerHeaderText } from '@/components/travel/traveler';

export function RecordReview({ id }: { id: number }) {
  const Contents = {
    backgroundNode: <TravelerHeaderText text='여행은 어땠나요?' />,
    childNode: <TravelLog selectedTravel={id} />,
    type: 'edit' as const,
  };
  return <TravelComponent contents={Contents} />;
}
