export const getDates = (now: Date) => {
  const [year, month] = [now.getFullYear(), now.getMonth()];

  const firstDayOfMonth = new Date(year, month, 0);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const dayIndex = (firstDayOfMonth.getDay() + 1) % 7;
  const daysInFirstWeek = Array.from(
    { length: dayIndex },
    (_, j) => new Date(year, month, j - dayIndex + 1),
  );

  const daysInMonth = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, date) => new Date(year, month, date + 1),
  );

  const remainingDays = Array.from(
    { length: 42 - daysInFirstWeek.length - daysInMonth.length },
    (_, date) => new Date(year, month + 1, date + 1),
  );

  return [...daysInFirstWeek, ...daysInMonth, ...remainingDays];
};
