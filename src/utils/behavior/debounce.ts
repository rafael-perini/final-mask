export default class Debounce<T extends (...args: Parameters<T>) => ReturnType<T>> {
  private _function: T;
  private _timeout: number;
  private _timerId?: ReturnType<typeof setTimeout>;
  private _nextCall?: () => ReturnType<T>;

  constructor(fn: T, timeout = 125) {
    this._function = fn;
    this._timeout = timeout;
  }

  run(...args: Parameters<T>): void {
    this.clearTimer();

    this._nextCall = () => {
      this._nextCall = undefined;
      return this._function(...args);
    };

    this._timerId = setTimeout(() => {
      this._nextCall?.();
    }, this._timeout);
  }

  flush() {
    this.clearTimer();
    this._nextCall?.();
  }

  private clearTimer() {
    clearTimeout(this._timerId);
  }
}
