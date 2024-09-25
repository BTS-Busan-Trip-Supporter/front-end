'use client';

import { useState } from 'react';

import { TravelComponent, TravelList, TravelLog } from '@/components';
import { TravelerHeaderText } from '@/components/travel/traveler';

interface Tour {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

export function Record() {
  const [selectedTravel, setSelectedTravel] = useState<Tour | null>(null);

  const handleSelectTravel = (tour: Tour) => {
    setSelectedTravel(tour);
  };

  const handlePrevButton = () => {
    setSelectedTravel(null);
  };

  const Contents = {
    backgroundNode: <TravelerHeaderText text='여행은 어땠나요?' />,
    childNode: selectedTravel ? (
      <TravelLog
        selectedTravel={selectedTravel}
        handlePrevButton={handlePrevButton}
      />
    ) : (
      <TravelList onSelectTravel={handleSelectTravel} />
    ),
    type: 'edit' as const,
  };
  return <TravelComponent contents={Contents} />;
}
