export type ScheduleTimeFromServer =
  | 'MORNING'
  | 'AFTERNOON'
  | 'EVENING'
  | 'NIGHT';

export const TimeConversionMap = {
  fromServer: {
    MORNING: 'morning',
    MIDNOON: 'afternoon',
    AFTERNOON: 'evening',
    EVENING: 'night',
  },
  toServer: {
    morning: 'MORNING',
    afternoon: 'MIDNOON',
    evening: 'AFTERNOON',
    night: 'EVENING',
  },
} as const;

export const DropBoxMenu = {
  travelType: [
    { id: '12', type: '관광지' },
    { id: '14', type: '문화시설' },
    { id: '15', type: '축제공연행사' },
    { id: '28', type: '레포츠' },
    { id: '38', type: '쇼핑' },
    { id: '39', type: '음식점' },
  ],
  regionType: [
    { id: '1', type: '강서구' },
    { id: '2', type: '금정구' },
    { id: '3', type: '기장군' },
    { id: '4', type: '남구' },
    { id: '5', type: '동구' },
    { id: '6', type: '동래구' },
    { id: '7', type: '부산진구' },
    { id: '8', type: '북구' },
    { id: '9', type: '사상구' },
    { id: '10', type: '사하구' },
    { id: '11', type: '서구' },
    { id: '12', type: '수영구' },
    { id: '13', type: '연제구' },
    { id: '14', type: '영도구' },
    { id: '15', type: '중구' },
    { id: '16', type: '해운대구' },
  ],
};
