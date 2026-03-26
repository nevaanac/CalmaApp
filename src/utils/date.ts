const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTodayKey = (): string => formatDateKey(new Date());

export const parseDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatFriendlyDate = (dateKey: string): string =>
  parseDateKey(dateKey).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const getLastNDates = (days: number, endDate = new Date()): string[] =>
  Array.from({ length: days }, (_, index) => {
    const current = new Date(endDate.getTime() - (days - 1 - index) * DAY_IN_MS);
    return formatDateKey(current);
  });

export const isSameDateKey = (left: string, right: string): boolean => left === right;
