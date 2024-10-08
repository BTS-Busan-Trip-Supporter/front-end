import axios from 'axios';

import type {
  GetTripScheduleResponseDTO,
  GetTripSchedulesResponseDTO,
  PostDayTripRequestDTO,
  PostDayTripResponseDTO,
  PostTripScheduleDTO,
  PutTripActivityHistoryDTO,
  PutTripActivityRecommendDTO,
  PutTripScheduleRequestDTO,
} from './trip.dto';

export const getTripSchedules = () =>
  axios
    .get<GetTripSchedulesResponseDTO>('/p-travel-log/trips/schedule')
    .then((res) => res.data);

export const getTripSchedule = (logId: number) =>
  axios
    .get<GetTripScheduleResponseDTO>(`/p-travel-log/trips/schedule/${logId}`)
    .then((res) => res.data);

export const putTripSchedule = (
  logId: number,
  body: PutTripScheduleRequestDTO,
) =>
  axios
    .put<number>(`/p-travel-log/trips/schedule/${logId}`, body)
    .then((res) => res.data);

export const deleteTripSchedule = (logId: number) =>
  axios.delete(`/p-travel-log/trips/schedule/${logId}`).then((res) => res.data);

export const putTripActivityRecommend = (body: PutTripActivityRecommendDTO) =>
  axios
    .put(`/p-travel-log/trips/activity/recommend`, body)
    .then((res) => res.data);

export const putTripActivityHistory = (body: PutTripActivityHistoryDTO) =>
  axios
    .put(`/p-travel-log/trips/activity/history`, body)
    .then((res) => res.data);

export const postTripSchedule = (body: PostTripScheduleDTO) =>
  axios
    .post<{
      status: string;
      data: number;
    }>('/p-travel-log/trips/schedule', body)
    .then((res) => res.data);

export const postDayTrip = (body: PostDayTripRequestDTO) =>
  axios
    .post<PostDayTripResponseDTO>(`/p-travel-log/trips/day`, body)
    .then((res) => res.data)
    .then((res) => ({
      status: res.status,
      data: res.data.map((location) =>
        location.imageUrl === ''
          ? { ...location, imageUrl: '/no-image.svg' }
          : location,
      ),
    }));
