import axios from 'axios';

import {
  type GetTourSpotsDTO,
  type GetTourSpotContentDTO,
} from './tour-spot.dto';

export const getTourSpots = (keyword: string, sigunguCode: string) =>
  axios
    .get<GetTourSpotsDTO>(`/p-travel-log/tourspots`, {
      params: { keyword, sigunguCode },
    })
    .then((res) => res.data);

export const getTourSpotContents = (contentId: string, contentTypeId: string) =>
  axios
    .get<GetTourSpotContentDTO>(`/p-travel-log/tourspots/${contentId}`, {
      params: {
        contentTypeId,
      },
    })
    .then((res) => res.data);
