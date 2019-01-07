
export function compare(a: string | Date, b: string | Date, isAsc: boolean = true) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
