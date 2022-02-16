export function debounce<Params extends any[]>(
  fn: (...args: Params) => any,
  waitInMs: number
): (...args: Params) => void {
  let timeout: any;

  return function (...args: Params) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args)
      timeout = null;
    }, waitInMs)
  }
}
