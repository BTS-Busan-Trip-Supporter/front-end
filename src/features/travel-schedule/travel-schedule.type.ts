export interface Destination {
  name: string;
  timeToDestination: number;
  startDate: Date;
  endDate: Date;
}

export interface DaySchedule {
  destinations: Destination[];
}

export interface TravelSchedule {
  schedules: DaySchedule[];
}
