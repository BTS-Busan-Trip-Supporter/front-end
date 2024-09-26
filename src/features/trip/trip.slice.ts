import { create } from 'zustand';

import type { TripItem } from '@/features/trip/trip.dto';
import { TIME_ORDER } from '@/features/trip/trip.type';

export interface Activity {
  spotName: string;
  recommend?: boolean;
  history?: string;
  dayNumber: number;
  dayTime: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
  orderIndex: number;
  tourSpotDto: {
    id: string;
    typeId: string;
    title: string;
    sigunguCode: string;
  };
}

export interface TourInfo {
  name?: string;
  locationName?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface TripState {
  tourInfo: TourInfo;
  activities: Array<Array<Activity>>;

  isRecommendLoading: boolean;
  recommendContent?: string;
  recommendedItems: TripItem[];
}

export interface TripAction {
  setLocation: (location: string) => void;
  setDates: (dates: { start: Date; end: Date }) => void;
  setIsRecommendLoading: (isRecommendLoading: boolean) => void;
  setRecommendContent: (content: string) => void;
  setRecommendedItems: (items: TripItem[]) => void;
  addTour: () => void;
  addActivity: (day: number, activity: Activity) => void;
  removeActivity: (day: number, activity: Activity) => void;
  fillActivities: (items: Activity[]) => void;
}

const initialState: TripState = {
  tourInfo: {},
  activities: [],
  isRecommendLoading: false,
  recommendedItems: [],
};

export const useTripStore = create<TripState & TripAction>((set) => ({
  ...initialState,

  setLocation: (location: string) =>
    set((prev) => ({
      ...prev,
      tourInfo: {
        name: location,
        locationName: location,
      },
    })),

  setDates: ({ start, end }: { start: Date; end: Date }) =>
    set((prev) => ({
      ...prev,
      tourInfo: {
        ...prev.tourInfo,
        startTime: start,
        endTime: end,
      },
      activities: Array.from(
        {
          length:
            Math.round(
              ((end ? end.getTime() : start.getTime()) - start.getTime()) /
                (24 * 60 * 60 * 1000),
            ) + 1,
        },
        () => [],
      ),
    })),

  setIsRecommendLoading: (isRecommendLoading) =>
    set((prev) => ({
      ...prev,
      isRecommendLoading,
    })),

  setRecommendContent: (content: string) =>
    set((prev) => ({ ...prev, recommendContent: content })),

  setRecommendedItems: (items) =>
    set((prev) => ({
      ...prev,
      recommendedItems: items,
    })),

  addTour: () =>
    set((prev) => ({ ...prev, activities: [...prev.activities, []] })),

  addActivity: (day, activity) =>
    set((prev) => ({
      ...prev,
      activities: prev.activities.map((acts, index) =>
        index !== day - 1
          ? acts
          : acts
              .concat(activity)
              .sort((a, b) => TIME_ORDER[a.dayTime] - TIME_ORDER[b.dayTime]),
      ),
    })),

  removeActivity: (day, activity) =>
    set((prev) => ({
      ...prev,
      activities: prev.activities.map((acts, index) =>
        index !== day - 1
          ? acts
          : acts.filter(
              (act) =>
                act.dayTime !== activity.dayTime ||
                act.spotName !== activity.spotName,
            ),
      ),
    })),

  fillActivities: (items) =>
    set((prev) => {
      const { activities } = prev;

      const newActivities = [...activities];

      for (const activity of items) {
        const targetTime = activity.dayTime;

        let flag = false;
        for (const acts of newActivities) {
          if (acts.find((act) => act.dayTime === targetTime)) continue;
          acts.push(activity);
          acts.sort((a, b) => TIME_ORDER[a.dayTime] - TIME_ORDER[b.dayTime]);
          flag = true;
          break;
        }

        if (flag) continue;

        for (const acts of newActivities) {
          if (acts.length === 4) continue;

          const remaining = acts.reduce<
            ('MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT')[]
          >(
            (res, curr) => res.filter((v) => v !== curr.dayTime),
            ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'],
          );

          const time = remaining.shift();
          if (time) {
            acts.push({ ...activity, dayTime: time });
            acts.sort((a, b) => TIME_ORDER[a.dayTime] - TIME_ORDER[b.dayTime]);
          }
        }
      }

      return { ...prev, activities: newActivities };
    }),
}));
