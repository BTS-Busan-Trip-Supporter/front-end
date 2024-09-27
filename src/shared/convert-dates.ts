export function convertDate(date: Date) {
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    .replace(/\.$/, '');
}

export function getMonthAndDate(isoString: string, daysToAdd: number) {
  const [month, day] = isoString.slice(5, 10).split('-').map(Number);

  return `${month}. ${day + daysToAdd - 1}`;
}

export function getDayOfWeek(isoString: string, daysToAdd: number) {
  const date = new Date(isoString);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return daysOfWeek[date.getUTCDay() + daysToAdd - 1];
}
