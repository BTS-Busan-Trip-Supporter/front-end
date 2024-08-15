export interface Destination {
  id: string;
  name: string;
  timeToDestination: number;
  startDate: Date;
  endDate: Date;
}

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
    this.destinations.sort((lhs, rhs) => {
      const [lhsStartTime, rhsStartTime] = [
        lhs.startDate.getTime(),
        rhs.startDate.getTime(),
      ];
      if (lhsStartTime < rhsStartTime) return -1;
      if (lhsStartTime === rhsStartTime) return 0;
      return 1;
    });
  }
}

export interface TravelSchedule {
  schedules: DaySchedule[];
}
