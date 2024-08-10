import { TravelComponent } from '@/components';
import { TravelModeLogo } from '@/components/travel';

export function TravelerPage() {
  return (
    <TravelComponent
      contents={{
        backgroundNode: <TravelModeLogo />,
        childNode: <></>,
        type: 'traveler',
      }}
    />
  );
}
