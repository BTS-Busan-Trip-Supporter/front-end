import { create } from 'zustand';

import type { TripItem } from '@/features/trip/trip.dto';
import { DropBoxMenu, TIME_ORDER } from '@/features/trip/trip.type';

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
  sigunguCode?: string;
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
  isAllTravelSchedulesFilled: () => boolean;
  setLocation: (location: string) => void;
  setDates: (dates: { start: Date; end: Date }) => void;
  setIsRecommendLoading: (isRecommendLoading: boolean) => void;
  setRecommendContent: (content: string) => void;
  setRecommendedItems: (items: TripItem[]) => void;
  addTour: () => void;
  removeTour: (day: number) => void;
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

export const useTripStore = create<TripState & TripAction>((set, get) => ({
  ...initialState,

  isAllTravelSchedulesFilled: () =>
    !get().activities.some((acts) => acts.length < 4),

  setLocation: (location: string) =>
    set((prev) => ({
      ...prev,
      tourInfo: {
        name: location,
        locationName: location,
        sigunguCode: String(
          DropBoxMenu.regionType.find((region) => region.type === location)
            ?.id ?? '1',
        ),
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
    set((prev) => {
      const { tourInfo, activities } = prev;
      if (!tourInfo.startTime || !tourInfo.endTime) return prev;

      const DAY = 60 * 60 * 24 * 1000;
      const days =
        (Math.round(tourInfo.endTime.getTime() - tourInfo.startTime.getTime()) +
          1) /
        DAY;

      return {
        ...prev,
        tourInfo: {
          ...tourInfo,
          endTime:
            days >= activities.length
              ? new Date(tourInfo.endTime.getTime() + DAY)
              : tourInfo.endTime,
        },
        activities: [...prev.activities, []],
      };
    }),

  removeTour: (day) =>
    set((prev) => {
      const { tourInfo, activities } = prev;
      if (!tourInfo.startTime || !tourInfo.endTime) return prev;

      return {
        ...prev,
        tourInfo: {
          ...tourInfo,
          endTime: new Date(tourInfo.endTime.getTime() - 60 * 60 * 24 * 1000),
        },
        activities: [...activities.slice(0, day - 1), ...activities.slice(day)],
      };
    }),

  removeTour: (day) =>
    set((prev) => ({
      ...prev,
      activities: [
        ...prev.activities.slice(0, day - 1),
        ...prev.activities.slice(day),
      ],
    })),

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

      items.forEach((activity) => {
        const targetTime = activity.dayTime;

        let flag = false;
        newActivities.some((acts, index) => {
          if (acts.find((act) => act.dayTime === targetTime)) return false;
          acts.push({ ...activity, dayNumber: index + 1 });
          acts.sort((a, b) => TIME_ORDER[a.dayTime] - TIME_ORDER[b.dayTime]);
          flag = true;
          return true;
        });

        if (flag) return;

        newActivities.forEach((acts, index) => {
          if (acts.length === 4) return;

          const remaining = acts.reduce<
            ('MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT')[]
          >(
            (res, curr) => res.filter((v) => v !== curr.dayTime),
            ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'],
          );

          const time = remaining.shift();
          if (time) {
            acts.push({ ...activity, dayTime: time, dayNumber: index + 1 });
            acts.sort((a, b) => TIME_ORDER[a.dayTime] - TIME_ORDER[b.dayTime]);
          }
        });
      });

      return { ...prev, activities: newActivities };
    }),
}));
