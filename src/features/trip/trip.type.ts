export type ScheduleTimeFromServer =
  | 'MORNING'
  | 'MIDNOON'
  | 'AFTERNOON'
  | 'EVENING';

export const TimeConversionMap = {
  fromServer: {
    MORNING: 'morning',
    MIDNOON: 'afternoon',
    AFTERNOON: 'evening',
    EVENING: 'night',
  },
  toServer: {
    morning: 'MORNING',
    afternoon: 'MIDNOON',
    evening: 'AFTERNOON',
    night: 'EVENING',
  },
} as const;
