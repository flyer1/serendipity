const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export function dateDiffInDays(a: Date, b: Date) {
  // Discard the time and time-zone information.
  // This works because UTC time never observes DST.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function stringToDate(value: string): Date {
  const parts = value.split('-');

  // Pay attention to the month (parts[1]); JavaScript counts months from 0
  const result = new Date(+parts[0], +parts[1] - 1, +parts[2]);
  return result;
}
