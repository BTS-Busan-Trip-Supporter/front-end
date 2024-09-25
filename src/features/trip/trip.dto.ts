/**
 * name, locationName => 지역명으로 통일
 * 여행 기록 페이지에서 지역명 + 여행 일자만 표기
 */

export interface TourLogDTO {
  id: number;
  name: string;
  locationName: string;
  startDate: string;
  endTime: string;
}

export interface TourActivityDTO {
  id: number;
  spotName: string;
  recommend?: boolean;
  history?: boolean;
  dayNumber: number;
  dayTime: 'MORNING' | 'MIDNOON' | 'AFTERNOON' | 'EVENING';
  orderIndex: number;
}

export interface TourSpotDTO {
  id: string;
  typeId: string;
  title: string;
  sigunguCode: string;
}

export interface GetTripSchedulesResponseDTO {
  tourLogInfos: TourLogDTO[];
}

export interface GetTripScheduleResponseDTO {
  status: string;
  data: {
    tourLogInfo: TourLogDTO;
    tourActivityInfos: Array<
      TourActivityDTO & {
        tourSpotDto: TourSpotDTO;
      }
    >;
  };
}

export interface PutTripScheduleRequestDTO {
  tourLogData: {
    id: number;
    name: string;
    locationName: string;
    startTime: Date;
    endTime: Date;
  };
  tourActivityDataList: Array<{
    id: number;
    spotName: string;
    dayNumber: number;
    dayTime: 'MORNING' | 'MIDNOON' | 'AFTERNOON' | 'EVENING';
    orderIndex: number;
    tourSpotData: {
      contentId: string;
      contentTypeId: string;
      title: string;
      sigunguCode: string;
    };
    isNew: boolean;
    isOrderChanged: boolean;
    isTourSpotChanged: boolean;
    isDeleted: boolean;
  }>;
}

export interface PutTripActivityRecommendDTO {
  tourActivityId: number;
  recommend?: boolean;
}

export interface PutTripActivityHistoryDTO {
  tourActivityId: number;
  history?: string;
}

export interface TourActivity {
  id: number;
  spotName: string;
  dayNumber: number;
  dayTime: 'MORNING' | 'MIDNOON' | 'AFTERNOON' | 'EVENING';
  orderIndex: number;
  tourSpotData: {
    contentId: string;
    contentTypeId: string;
    title: string;
    sigunguCode: string;
  };
  isNew: boolean;
  isOrderChanged: boolean;
  isTourSpotChanged: boolean;
  isDeleted: boolean;
}

export interface PostTripScheduleDTO {
  tourLogData: {
    id: number;
    name: string;
    locationName: string;
    startTime: string;
    endTime: string;
  };
  tourActivityDataList: Array<TourActivity>;
}

export interface TripItem {
  contentId: string;
  contentTypeId: string;
  title: string;
  imageUrl: string;
}

export interface PostDayTripRequestDTO {
  contentTypeId: string;
  sigunguCode: string;
  dayTimes: ('MORNING' | 'MIDNOON' | 'AFTERNOON' | 'EVENING')[];
  tourDate: string;
}

export interface PostDayTripResponseDTO {
  status: string;
  data: TripItem[];
}
