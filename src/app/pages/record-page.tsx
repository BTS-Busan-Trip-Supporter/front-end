'use client';

import { TravelComponent } from '@/components';
import {
  TravelerHeaderText,
  TravelerTravelReview,
} from '@/components/travel/traveler';
import { useTravelScheduleStore } from '@/providers';

export function Record() {
  const schedules = useTravelScheduleStore((state) => state.schedules);

  const updateDestination = useTravelScheduleStore(
    (state) => state.updateDestination,
  );

  const Contents = {
    backgroundNode: <TravelerHeaderText text='여행은 어땠나요?' />,
    childNode: (
      <TravelerTravelReview
        when='2024.05.12-2024.05.13'
        where='부산광역시 (Busan)'
        schedules={schedules}
        onLikeButtonClick={(day, destination) => {
          updateDestination({
            day,
            target: destination,
            updateValue: {
              ...destination,
              selected: destination.selected === 'like' ? undefined : 'like',
            },
          });
        }}
        onUnlikeButtonClick={(day, destination) => {
          updateDestination({
            day,
            target: destination,
            updateValue: {
              ...destination,
              selected:
                destination.selected === 'unlike' ? undefined : 'unlike',
            },
          });
        }}
      />
    ),
    type: 'auto' as const,
  };
  return <TravelComponent contents={Contents} />;
}
