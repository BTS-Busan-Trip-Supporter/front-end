import { useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteTripSchedule,
  getTripSchedule,
  getTripSchedules,
  postDayTrip,
  postTripSchedule,
  putTripActivityHistory,
  putTripActivityRecommend,
  putTripSchedule,
} from './trip.api';
import {
  PostDayTripRequestDTO,
  PostTripScheduleDTO,
  PutTripActivityHistoryDTO,
  PutTripActivityRecommendDTO,
  PutTripScheduleRequestDTO,
  PostDayTripResponseDTO,
} from './trip.dto';

export const useTripSchedules = () =>
  useQuery({
    queryKey: ['/trips/schedule'],
    queryFn: () => getTripSchedules(),
  });

export const useTripSchedule = (logId: number) =>
  useQuery({
    queryKey: [`/trips/schedule/${logId}`],
    queryFn: () => getTripSchedule(logId),
  });

export const usePutTripSchedule = (
  logId: number,
  body: PutTripScheduleRequestDTO,
) =>
  useMutation<number>({
    mutationFn: () => putTripSchedule(logId, body),
  });

export const useRemoveTripSchedule = (logId: number) =>
  useMutation({
    mutationFn: () => deleteTripSchedule(logId),
  });

export const useUpdateActivityRecommend = (body: PutTripActivityRecommendDTO) =>
  useMutation({
    mutationFn: () => putTripActivityRecommend(body),
  });

export const useUpdateActivityHistory = (body: PutTripActivityHistoryDTO) =>
  useMutation({
    mutationFn: () => putTripActivityHistory(body),
  });

export const useRecommendDayTrip = () =>
  useMutation<PostDayTripResponseDTO, Error, PostDayTripRequestDTO>({
    mutationFn: (body) => postDayTrip(body),
  });

export const useCreateTripSchedule = (body: PostTripScheduleDTO) =>
  useMutation({
    mutationFn: () => postTripSchedule(body),
  });
