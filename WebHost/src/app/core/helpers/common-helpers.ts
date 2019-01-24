
export function compare(a: string | Date, b: string | Date, isAsc: boolean = true) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function copyToClipboard(val: string) {
  const textarea = document.createElement('textarea');

  // Place in top-left corner of screen regardless of scroll position.
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '2em';
  textarea.style.height = '2em';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';

  textarea.value = val;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    return true;
  } catch (err) {
    // iOS does not allow to programmatically copy text to the clipboard.
    console.log('Oops, unable to copy');
    return false;
  }
  finally {
    document.body.removeChild(textarea);
  }
}
