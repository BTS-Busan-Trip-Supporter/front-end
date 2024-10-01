import { create } from 'zustand';

import type {
  GetTripScheduleResponseDTO,
  TripItem,
} from '@/features/trip/trip.dto';
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
  totalTime?: number;
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

  selectedDay?: number;
  isLoading: boolean;
  recommendContent?: string;
  recommendedItems: TripItem[];
}

export interface TripAction {
  isAllTravelSchedulesFilled: () => boolean;
  setLocation: (location: string) => void;
  setDates: (dates: { start: Date; end: Date }) => void;
  setIsLoading: (isLoading: boolean) => void;
  setRecommendContent: (content: string) => void;
  setRecommendedItems: (items: TripItem[]) => void;
  addTour: () => void;
  removeTour: (day: number) => void;
  addActivity: (day: number, activity: Activity) => void;
  removeActivity: (day: number, activity: Activity) => void;
  fillActivities: (day: number, items: Activity[]) => void;
  load: (dto: GetTripScheduleResponseDTO) => void;
  setSelectedDay: (day: number) => void;
}

const initialState: TripState = {
  tourInfo: {},
  activities: [],
  isLoading: false,
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

  setIsLoading: (isLoading) =>
    set((prev) => ({
      ...prev,
      isLoading,
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

      if (!tourInfo.startTime) return prev;

      const { startTime } = tourInfo;
      const endTime = tourInfo.endTime ?? startTime;

      const DAY = 60 * 60 * 24 * 1000;
      const days =
        (Math.round(endTime.getTime() - startTime.getTime()) + 1) / DAY;

      return {
        ...prev,
        tourInfo: {
          ...tourInfo,
          endTime:
            days >= activities.length
              ? new Date(endTime.getTime() + DAY)
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

  fillActivities: (day, items) =>
    set((prev) => {
      const { activities } = prev;

      const newActivities = [...activities];

      items.forEach((activity, index) => {
        if (
          newActivities[day - 1].some((act) => act.dayTime === activity.dayTime)
        )
          return;

        newActivities[day - 1].push({ ...activity, dayNumber: index + 1 });
        newActivities[day - 1].sort(
          (a, b) => TIME_ORDER[a.dayTime] - TIME_ORDER[b.dayTime],
        );
      });

      return { ...prev, activities: newActivities };
    }),

  load: (dto) =>
    set((prev) => {
      const newActivities = [...prev.activities];

      dto.data.tourActivityInfos.forEach((activityInfo) => {
        const { dayNumber } = activityInfo;
        newActivities[dayNumber - 1] = newActivities[dayNumber - 1].map(
          (activity) =>
            activity.spotName === activityInfo.spotName &&
            activity.dayTime === activityInfo.dayTime
              ? { ...activity, totalTime: activityInfo.totalTime }
              : activity,
        );
      });

      return { ...prev, activities: newActivities };
    }),

  setSelectedDay: (day) => set((prev) => ({ ...prev, selectedDay: day })),
}));
