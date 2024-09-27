export function translateDayTime(dayTime: string) {
  switch (dayTime) {
    case 'MORNING':
      return '오전';
    case 'AFTERNOON':
      return '오후';
    case 'EVENING':
      return '저녁';
    case 'NIGHT':
      return '밤';
    default:
      return dayTime;
  }
}
