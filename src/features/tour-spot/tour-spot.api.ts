import axios from 'axios';

import {
  type GetTourSpotContentDTO,
  type GetTourSpotsDTO,
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
    .then((res) => res.data)
    .then((res) => ({
      ...res,
      data: {
        ...res.data,
        firstImage:
          res.data.firstImage === '' ? '/no-image.svg' : res.data.firstImage,
      },
    }));
