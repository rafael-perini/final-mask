export default class Snapshot<T> {
  private _history: T[];
  private _pointer: number;

  constructor(defaultValue: T) {
    this._history = [defaultValue];
    this._pointer = 0;
  }

  insert(value: T) {
    this._pointer++;
    this._history.splice(this._pointer, this._history.length - this._pointer, value);
  }

  undo(): T {
    this._pointer--;
    return this._history[this._pointer];
  }

  redo(): T {
    this._pointer++;
    return this._history[this._pointer];
  }
}
