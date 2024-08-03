import { createStore } from 'zustand';

import {
  DaySchedule,
  Destination,
  TravelSchedule,
} from './travel-schedule.model';

export type TravelScheduleState = TravelSchedule;

export interface TravelScheduleActions {
  addDaySchedule: () => void;

  addDestination: (params: { day: number; destination: Destination }) => void;

  removeDestination: (params: {
    day: number;
    destination: Destination;
  }) => void;

  reset: () => void;
}

export type TravelScheduleStore = TravelScheduleState & TravelScheduleActions;

export const defaultInitState: TravelScheduleState = {
  schedules: [],
};

type Setter = (
  partial:
    | TravelScheduleStore
    | Partial<TravelScheduleStore>
    | ((
        state: TravelScheduleStore,
      ) => TravelScheduleStore | Partial<TravelScheduleStore>),
  replace?: boolean | undefined,
) => void;

const addDaySchedule = ({ set }: { set: Setter }) =>
  set((state) => ({
    schedules: [...state.schedules, new DaySchedule({ destinations: [] })],
  }));

const addDestination = ({
  day,
  destination,
  set,
}: {
  day: number;
  destination: Destination;
  set: Setter;
}) =>
  set((state) => {
    console.log(state.schedules, day, destination);
    const result = [...state.schedules];
    result[day].addDestination({ destination });
    return { schedules: result };
  });

const removeDestination = ({
  day,
  destination,
  set,
}: {
  day: number;
  destination: Destination;
  set: Setter;
}) =>
  set((state) => {
    const result = [...state.schedules];
    result[day].removeDestination({ destinationId: destination.id });
    return { schedules: result };
  });

export const createTravelScheduleStore = (
  initState: TravelScheduleState = defaultInitState,
) => {
  return createStore<TravelScheduleStore>()((set) => ({
    ...initState,
    addDaySchedule: () => addDaySchedule({ set }),
    addDestination: ({ day, destination }) =>
      addDestination({ day, destination, set }),
    removeDestination: ({ day, destination }) =>
      removeDestination({ day, destination, set }),
    reset: () => set(defaultInitState),
  }));
};
