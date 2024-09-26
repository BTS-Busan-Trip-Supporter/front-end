export function convertDate(isoString: string) {
  const date = new Date(isoString);

  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    .replace(/\.$/, '');
}

export function getDateWithDaysAdded(isoString: string, daysToAdd: number) {
  const currentYear = new Date().getFullYear();
  const [month, day] = isoString.split('. ').map(Number);
  const startDate = new Date(currentYear, month - 1, day);

  startDate.setDate(startDate.getDate() + daysToAdd);

  const resultMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const resultDay = String(startDate.getDate()).padStart(2, '0');

  return `${resultMonth}. ${resultDay}`;
}

export function getDayOfWeek(isoString: string, daysToAdd: number) {
  const date = new Date(isoString);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return daysOfWeek[date.getUTCDay() + daysToAdd];
}
