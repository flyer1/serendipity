
export function compare(a: string | Date, b: string | Date, isAsc: boolean = true) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function copyToClipboard(val: string) {
  const el = document.createElement('textarea');
  el.value = val;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
