export interface Destination {
  id: string;
  name: string;
  timeToDestination: number;
  time: 'morning' | 'afternoon' | 'evening' | 'night';
  selected?: 'like' | 'unlike';
}

const TIME_ORDER: Record<Destination['time'], number> = {
  morning: 0,
  afternoon: 1,
  evening: 2,
  night: 3,
};

export class DaySchedule {
  destinations: Destination[];

  constructor({ destinations }: Pick<DaySchedule, 'destinations'>) {
    this.destinations = destinations;
  }

  addDestination({ destination }: { destination: Destination }) {
    this.destinations.push(destination);
    this.sortByStartTime();
  }

  removeDestination({ destinationId }: { destinationId: Destination['id'] }) {
    this.destinations = this.destinations.filter(
      ({ id }) => id !== destinationId,
    );
  }

  updateDestination({
    destinationId,
    updateValue,
  }: {
    destinationId: Destination['id'];
    updateValue: Partial<Destination>;
  }) {
    this.destinations = this.destinations.map((destination) =>
      destination.id === destinationId
        ? { ...destination, ...updateValue }
        : destination,
    );
    this.sortByStartTime();
  }

  sortByStartTime() {
    this.destinations.sort(
      (lhs, rhs) => TIME_ORDER[lhs.time] - TIME_ORDER[rhs.time],
    );
  }
}

export interface TravelSchedule {
  schedules: DaySchedule[];
}
