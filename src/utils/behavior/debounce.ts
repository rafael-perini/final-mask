export default class Debounce<T extends (...args: unknown[]) => unknown> {
  private _function: T;
  private _timeout: number;
  private _timerId?: ReturnType<typeof setTimeout>;

  constructor(fn: T, timeout = 125) {
    this._function = fn;
    this._timeout = timeout;
  }

  run(...args: Parameters<T>): void {
    clearTimeout(this._timerId);

    this._timerId = setTimeout(() => {
      this._function(...args);
    }, this._timeout);
  }
}
