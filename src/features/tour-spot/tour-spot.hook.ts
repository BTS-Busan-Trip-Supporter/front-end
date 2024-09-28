import { useQuery } from '@tanstack/react-query';

import { getTourSpotContents, getTourSpots } from './tour-spot.api';

export const useSearchTourSpot = (
  keyword: string,
  sigunguCode: string,
  enabled: boolean = false,
) =>
  useQuery({
    enabled,
    queryKey: ['/tourspots', keyword, sigunguCode],
    queryFn: () => getTourSpots(keyword, sigunguCode),
  });

export const useTourSpotData = (contentId: string, contentTypeId: string) =>
  useQuery({
    queryKey: ['/tourspots', contentId, contentTypeId],
    queryFn: () => getTourSpotContents(contentId, contentTypeId),
  });
