import Logger from "@/utils/log/logger.ts";

export default class Snapshot<T> {
  private _history: T[];
  private _pointer: number;
  private _logger: Logger;

  constructor(defaultValue: T) {
    this._logger = new Logger(`Snapshot-instance-${Snapshot.instances++}`);
    this._history = [defaultValue];
    this._pointer = 0;
    this._logger.log("creating new instance with default value:", defaultValue);
  }

  private static instances = 0;

  insert(value: T) {
    this._pointer++;

    this._logger.log(`inserting from position ${this._pointer}:`, value);
    this._logger.log("history before insert", this._history);

    this._history.splice(this._pointer, this._history.length - this._pointer, value);

    this._logger.log("history after insert", this._history);
  }

  undo(): T {
    this._pointer--;

    this._logger.log(`history undo to position ${this._pointer} with value:`, this.getValue());

    return this.getValue();
  }

  redo(): T {
    this._pointer++;

    this._logger.log(`history redo to position ${this._pointer} with value:`, this.getValue());

    return this.getValue();
  }

  getValue(): T {
    return this._history[this._pointer];
  }
}
