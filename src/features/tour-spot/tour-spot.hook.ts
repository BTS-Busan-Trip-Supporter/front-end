import { useQuery } from '@tanstack/react-query';

import { getTourSpots, getTourSpotContents } from './tour-spot.api';

export const useSearchTourSpot = (keyword: string, sigunguCode: string) =>
  useQuery({
    queryKey: ['/tourspots', keyword, sigunguCode],
    queryFn: () => getTourSpots(keyword, sigunguCode),
  });

export const useTourSpotData = (contentId: string, contentTypeId: string) =>
  useQuery({
    queryKey: ['/tourspots', contentId, contentTypeId],
    queryFn: () => getTourSpotContents(contentId, contentTypeId),
  });
